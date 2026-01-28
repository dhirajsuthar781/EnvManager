import { Project } from "../models/project.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const createProject = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) throw new ApiError(400, "All fields are required");

  if (name.trim().length < 4) {
    throw new ApiError(400, "Name must be at least 4 characters long");
  }

  const project = await Project.create({
    name: name.trim(),
    userId: req.user,
    recentAt: Date.now(),
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    project: {
      _id: project._id,
      name: project.name,
      userId: project.userId,
      createdAt: project.createdAt,
    },
  });
});

const getProject = asyncHandler(async (req, res) => {
  const projects = await Project.find({
    userId: req.user,
  });

  const formattedProjects = projects.map((project) => ({
    _id: project._id,
    name: project.name,
    userId: project.userId,
    createdAt: project.createdAt,
  }));

  res.status(200).json({
    success: true,
    message: "Projects fetched successfully",
    formattedProjects,
  });
});

const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { name } = req.body;

  if (!projectId) {
    throw new ApiError(400, "Project Id is required");
  }

  if (!name || !name.trim()) {
    throw new ApiError(400, "Name is required");
  }

  if (name.trim().length < 3) {
    throw new ApiError(400, "Name must be at least 3 characters long");
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  // check ownership
  if (!project.userId.equals(req.user)) {
    throw new ApiError(403, "Access Denied");
  }

  project.recentAt = Date.now();
  project.name = name.trim();

  await project.save();

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project,
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, "Project Id is required");
  }

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  // check ownership
  if (!project.userId.equals(req.user)) {
    throw new ApiError(403, "Access Denied");
  }

  await project.deleteOne();

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});

const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, "Project id is required");
  }

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const isOwner = project.userId.equals(req.user);
  const isSharedUser = project.sharedWith.some((user) =>
    user.userId.equals(req.user),
  );

  if (!isOwner && !isSharedUser) {
    throw new ApiError(403, "Access Denied");
  }

  res.status(200).json({
    success: true,
    message: "Project fetched successfully",
    project,
  });
});

const getRecentProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ userId: req.user })
    .sort({
      recentAt: -1,
    })
    .limit(10)
    .select("_id name updatedAt");

  res.status(200).json({
    success: true,
    message: "Recent project fetched",
    projects,
  });
});

const shareProject = asyncHandler(async (req, res) => {
  // projectId : Params
  const { projectId } = req.params;

  // username, role : body
  const { username, role = "viewer" } = req.body;

  // validation
  if (!projectId) {
    throw new ApiError(400, "Project id id required");
  }

  if (!username) {
    throw new ApiError(400, "Username is required to share the project");
  }

  if (!["viewer", "editor"].includes(role)) {
    throw new ApiError(400, "Invalid role");
  }

  // find project
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  
  // check ownership
  if (!project.userId.equals(req.user)) {
    throw new ApiError(403, "Only Project owner can share this project");
  }

  // find user to share
  const targetedUser = await User.findOne({ username });
  if (!targetedUser) {
    throw new ApiError(404, "User not found");
  }

  // prevent duplicate and self sharing
  if (targetedUser._id.equals(req.user)) {
    throw new ApiError(400, "Can't share project with yourself");
  }

  // const duplicateSharing = project.sharedWith.some((user) =>
  //   user.userId.equals(targetedUser._id),
  // );
  // if (duplicateSharing) {
  //   throw new ApiError(400, "Project Already share with this user");
  // }

  const existingShare = project.sharedWith.find((u) =>
    u.userId.equals(targetedUser._id),
  );

  if (existingShare) {
    existingShare.role = role;
  } else {
    // share project
    project.sharedWith.push({
      userId: targetedUser._id,
      role,
    });
  }

  // save
  await project.save();

  // response
  res.status(200).json({
    success: true,
    message: `Project successfully shared with ${username} as ${role}`,
  });
});

export {
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getProjectById,
  getRecentProjects,
  shareProject,
};

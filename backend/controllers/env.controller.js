import { EnvFile } from "../models/env.model.js";
import { Project } from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const createEnvFile = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { projectId } = req.params;

  if (!title || !content) throw new ApiError(400, "All fields are required");

  if (title.length < 3)
    throw new ApiError(400, "Title must be at least 3 characters");

  //   check project ownership
  const project = await Project.findOne({
    _id: projectId,
    userId: req.user,
  });


  if (!project) throw new ApiError(403, "Access Denied");
  project.recentAt = Date.now();
  await project.save();
  //   create env file
  const envFile = await EnvFile.create({
    title,
    content,
    projectId,
  });

  res.status(201).json({
    success: true,
    message: "Env file created successfully",
    envFile: {
      _id: envFile._id,
      title: envFile.title,
      content: envFile.content,
      projectId: envFile.projectId,
      createdAt: envFile.createdAt,
    },
  });
});

const getEnvFile = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  //   check project ownership
  const project = await Project.findOne({
    _id: projectId,
    userId: req.user,
  });

  if (!project) throw new ApiError(403, "Access Denied");

  //   Fetch env's
  const envFiles = await EnvFile.find({
    projectId,
  });

  res.status(200).json({
    success: true,
    message: "Env files fetched successfully",
    envFiles,
  });
});

const updateEnvFile = asyncHandler(async (req, res) => {
  const { envId } = req.params;
  const { title, content } = req.body;

  if (!title && !content) throw new ApiError(400, "Nothing to update");

  if (title && title.length < 3)
    throw new ApiError(400, "Title must be at least 3 characters");

  if (content && content.length < 3)
    throw new ApiError(400, "Content must be at least 3 characters");

  const envFile = await EnvFile.findById(envId);

  if (!envFile) throw new ApiError(404, "Env file not found");

  // check ownership
  const project = await Project.findOne({
    _id: envFile.projectId,
    userId: req.user,
  });

  if (!project) throw new ApiError(403, "Access Denied");

  if (title) envFile.title = title;
  if (content) envFile.content = content;
  project.recentAt = Date.now();
  await project.save();
  await envFile.save();

  res.status(200).json({
    success: true,
    message: "Env File updated successfully.",
    envFile,
  });
});

const deleteEnvFile = asyncHandler(async (req, res) => {
  const { envId } = req.params;

  const envFile = await EnvFile.findById(envId);

  if (!envFile) throw new ApiError(404, "Env file not found");

  // check ownership
  const project = await Project.findOne({
    _id: envFile.projectId,
    userId: req.user,
  });

  if (!project) throw new ApiError(403, "Access Denied");
  project.recentAt = Date.now();
  await project.save();
  await envFile.deleteOne();

  res.status(200).json({
    success: true,
    message: "Env File deleted successfully.",
  });
});

const getEnvFileById = asyncHandler(async (req, res) => {
  const { envId } = req.params;

  const envFile = await EnvFile.findById(envId);

  if (!envFile) throw new ApiError(404, "Env file not found");

  // check ownership
  const project = await Project.findOne({
    _id: envFile.projectId,
    userId: req.user,
  });

  if (!project) throw new ApiError(403, "Access Denied");

  res.status(200).json({
    success: true,
    message: "Env File fetched successfully.",
    envFile,
  });
});

export {
  createEnvFile,
  getEnvFile,
  updateEnvFile,
  deleteEnvFile,
  getEnvFileById,
};

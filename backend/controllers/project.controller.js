import { Project } from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const createProject = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) throw new ApiError(400, "All fields are required");

  const project = await Project.create({
    name: name.trim(),
    userId: req.user,
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

export { createProject, getProject };

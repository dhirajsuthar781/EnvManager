import { EnvFile } from "../models/env.model.js";
import { Project } from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const createEnvFile = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { projectId } = req.params;

  if (!title || !content) throw new ApiError(400, "All fields are required");

  //   check project ownership
  const project = await Project.findOne({
    _id: projectId,
    userId: req.user,
  });

  if (!project) throw new ApiError(403, "Access Denied");

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

export { createEnvFile, getEnvFile };

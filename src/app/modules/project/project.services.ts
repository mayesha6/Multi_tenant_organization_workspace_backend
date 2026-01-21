import { Types } from "mongoose";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Project } from "./project.model";
import { ICreateProject } from "./project.interface";

const createProject = async (payload: ICreateProject) => {
  const isExists = await Project.findOne({
    name: payload.name,
    organizationId: payload.organizationId,
    isDeleted: false,
  });

  if (isExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Project already exists in this organization",
    );
  }

  const project = await Project.create(payload);
  return project;
};

const getAllProjects = async (organizationId: Types.ObjectId) => {
  return Project.find({ organizationId, isDeleted: false });
};

const updateProject = async (
  projectId: string,
  payload: Partial<ICreateProject>,
  organizationId: Types.ObjectId,
) => {
  const project = await Project.findOne({
    _id: projectId,
    organizationId,
    isDeleted: false,
  });

  if (!project) throw new AppError(httpStatus.NOT_FOUND, "Project not found");

  Object.assign(project, payload);
  await project.save();
  return project;
};

const deleteProject = async (
  projectId: string,
  organizationId: Types.ObjectId,
) => {
  const project = await Project.findOne({
    _id: projectId,
    organizationId,
    isDeleted: false,
  });

  if (!project) throw new AppError(httpStatus.NOT_FOUND, "Project not found");

  project.isDeleted = true;
  await project.save();
  return project;
};

export const ProjectServices = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
};

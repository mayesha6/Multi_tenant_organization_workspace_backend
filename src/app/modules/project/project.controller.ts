import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import httpStatus from "http-status-codes";
import { ProjectServices } from "./project.services";
import { catchAsync } from "../../utils/catchAsync";
import { IUserJwtPayload } from "../../interfaces";
import { sendResponse } from "../../utils/sendResponse";

const createProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { organizationId, _id: createdBy } = req.user as IUserJwtPayload;

    const project = await ProjectServices.createProject({
      ...req.body,
      organizationId: new Types.ObjectId(organizationId),
      createdBy: new Types.ObjectId(createdBy),
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Project Created Successfully",
      data: project,
    });
  },
);

const getAllProjects = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { organizationId } = req.user as IUserJwtPayload;

    const projects = await ProjectServices.getAllProjects(
      new Types.ObjectId(organizationId),
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Projects fetched successfully",
      data: projects,
    });
  },
);

const updateProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { organizationId } = req.user as IUserJwtPayload;
    const projectId = req.params.id;

    const project = await ProjectServices.updateProject(
      projectId,
      req.body,
      new Types.ObjectId(organizationId),
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Project Updated Successfully",
      data: project,
    });
  },
);

const deleteProject = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { organizationId } = req.user as IUserJwtPayload;
    const projectId = req.params.id;

    const project = await ProjectServices.deleteProject(
      projectId,
      new Types.ObjectId(organizationId),
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Project Deleted Successfully",
      data: project,
    });
  },
);

export const ProjectControllers = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
};

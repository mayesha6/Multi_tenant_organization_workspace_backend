import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Types } from "mongoose";
import { TaskServices } from "./task.services";
import { IUserJwtPayload } from "../../interfaces";

const createTask = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IUserJwtPayload;

  const task = await TaskServices.createTask({
    ...req.body,
    organizationId: new Types.ObjectId(user.organizationId),
    createdBy: new Types.ObjectId(user._id),
  });

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Task created successfully",
    data: task,
  });
});

const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IUserJwtPayload;
  let tasks;
  if (user.role === "ORGANIZATION_MEMBER") {
    tasks = await TaskServices.getAssignedTasks(
      new Types.ObjectId(user.organizationId),
      new Types.ObjectId(user._id),
    );
  } else {
    tasks = await TaskServices.getAllTasks(user.organizationId);
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Tasks fetched successfully",
    data: tasks,
  });
});

const getTaskById = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IUserJwtPayload;
  const task = await TaskServices.getTaskById(
    req.params.id,
    user.organizationId,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task fetched successfully",
    data: task,
  });
});

const updateTask = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IUserJwtPayload;
  const task = await TaskServices.updateTask(
    req.params.id,
    req.body,
    user.organizationId,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task updated successfully",
    data: task,
  });
});

const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IUserJwtPayload;
  const task = await TaskServices.deleteTask(
    req.params.id,
    user.organizationId,
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Task deleted successfully",
    data: task,
  });
});

export const TaskControllers = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

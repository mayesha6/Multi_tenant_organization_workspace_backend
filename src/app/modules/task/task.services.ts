import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Task } from "./task.model";
import { ICreateTask } from "./task.interface";
import { Types } from "mongoose";

const createTask = async (
  payload: ICreateTask & {
    organizationId: Types.ObjectId;
    createdBy: Types.ObjectId;
  },
) => {
  const task = await Task.create(payload);
  return task;
};

const getAllTasks = async (organizationId: string) => {
  return Task.find({
    organizationId: new Types.ObjectId(organizationId),
    isDeleted: false,
  });
};

const getAssignedTasks = async (
  organizationId: Types.ObjectId,
  userId: Types.ObjectId
) => {
  return Task.find({ organizationId, assignedTo: userId, isDeleted: false });
};

const getTaskById = async (taskId: string, organizationId: string) => {
  const task = await Task.findOne({
    _id: taskId,
    organizationId: new Types.ObjectId(organizationId),
    isDeleted: false,
  });
  if (!task) throw new AppError(httpStatus.NOT_FOUND, "Task not found");
  return task;
};

const updateTask = async (
  taskId: string,
  payload: Partial<ICreateTask>,
  organizationId: string,
) => {
  const task = await Task.findOne({
    _id: taskId,
    organizationId: new Types.ObjectId(organizationId),
    isDeleted: false,
  });
  if (!task) throw new AppError(httpStatus.NOT_FOUND, "Task not found");

  Object.assign(task, payload);
  await task.save();
  return task;
};

const deleteTask = async (taskId: string, organizationId: string) => {
  const task = await Task.findOne({
    _id: taskId,
    organizationId: new Types.ObjectId(organizationId),
    isDeleted: false,
  });
  if (!task) throw new AppError(httpStatus.NOT_FOUND, "Task not found");

  task.isDeleted = true;
  await task.save();
  return task;
};

export const TaskServices = {
  createTask,
  getAllTasks,
  getAssignedTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

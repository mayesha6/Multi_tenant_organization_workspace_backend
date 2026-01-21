import { Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  projectId: Types.ObjectId;
  organizationId: Types.ObjectId; 
  assignedTo?: Types.ObjectId; 
  createdBy: Types.ObjectId;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  isDeleted: boolean;
}

export interface ICreateTask {
  title: string;
  description?: string;
  projectId: string;
  assignedTo?: string;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}

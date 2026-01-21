import { Document, Types } from "mongoose";

export interface IProject extends Document {
  name: string;
  description?: string;
  organizationId: Types.ObjectId;
  createdBy: Types.ObjectId;
  isDeleted: boolean;
}

export interface ICreateProject {
  name: string;
  description?: string;
  organizationId: Types.ObjectId;
  createdBy: Types.ObjectId;
}

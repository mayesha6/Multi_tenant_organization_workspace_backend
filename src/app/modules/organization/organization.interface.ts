import { Types } from "mongoose";

export interface IOrganization {
  _id?: Types.ObjectId;
  name: string;
  slug: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

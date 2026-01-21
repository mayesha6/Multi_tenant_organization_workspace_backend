import { Schema, model } from "mongoose";
import { IOrganization } from "./organization.interface";

const organizationSchema = new Schema<IOrganization>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Organization = model<IOrganization>(
  "Organization",
  organizationSchema
);

import { Types } from "mongoose";

export enum Role {
  PLATFORM_ADMIN = "PLATFORM_ADMIN",
  ORGANIZATION_ADMIN = "ORGANIZATION_ADMIN",
  ORGANIZATION_MEMBER = "ORGANIZATION_MEMBER",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface IAuthProvider {
  provider: "credentials";
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: string;
  isActive?: IsActive;
  role: Role;
  organizationId?: Types.ObjectId | null;
  auths: IAuthProvider[];
  createdAt?: Date;
}

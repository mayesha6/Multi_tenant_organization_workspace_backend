import httpStatus from "http-status-codes";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import { userSearchableFields } from "./user.constant";
import { JwtPayload } from "jsonwebtoken";
import {
  deleteImageFromCLoudinary,
  uploadBufferToCloudinary,
} from "../../config/cloudinary.config";
import bcryptjs from "bcryptjs";
import { QueryBuilder } from "../../utils/QueryBuilder";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BCRYPT_SALT_ROUND),
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    role: payload.role || Role.ORGANIZATION_MEMBER,
    organizationId: payload.organizationId,
    ...rest,
  });

  return user;
};

const getAllUsers = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(User.find(), query);
  const usersData = queryBuilder
    .filter()
    .search(userSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    usersData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getMe = async (userId: string) => {
  const user = await User.findById(userId).select("-password");
  return {
    data: user,
  };
};

const getSingleUser = async (id: string) => {
  const user = await User.findById(id).select("-password");
  return {
    data: user,
  };
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload,
) => {
  if (decodedToken.role === Role.ORGANIZATION_MEMBER) {
    if (userId !== decodedToken.userId) {
      throw new AppError(401, "You are not authorized");
    }
  }

  const ifUserExist = await User.findById(userId);

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  if (
    decodedToken.role === Role.ORGANIZATION_ADMIN &&
    ifUserExist.role === Role.PLATFORM_ADMIN
  ) {
    throw new AppError(401, "You are not authorized");
  }

  if (payload.role) {
    if (decodedToken.role === Role.ORGANIZATION_MEMBER) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.isActive || payload.isDeleted) {
    if (decodedToken.role === Role.ORGANIZATION_MEMBER) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

export const updateMyProfile = async (
  userId: string,
  payload: any,
  decodedToken: JwtPayload,
  file?: Express.Multer.File,
) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User not found");

  if (decodedToken.role === "USER" && decodedToken.userId !== userId) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      Number(envVars.BCRYPT_SALT_ROUND),
    );
  }

  if (file) {
    if (user.picture) {
      await deleteImageFromCLoudinary(user.picture);
    }

    const uploadResult = await uploadBufferToCloudinary(
      file.buffer,
      `profile-${userId}`,
    );
    payload.picture = uploadResult?.secure_url;
  }

  const updated = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return updated;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getMe,
  getSingleUser,
  updateUser,
  updateMyProfile,
};

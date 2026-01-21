import bcrypt from "bcryptjs";
import httpStatus from "http-status-codes";
import * as jwt from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { envVars } from "../../config/env";
import { User } from "../user/user.model";
import { createNewAccessTokenWithRefreshToken } from "../../utils/userTokens";

const credentialsLogin = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  if (user.isActive === "BLOCKED") {
    throw new AppError(httpStatus.FORBIDDEN, "User is blocked");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password!);

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const jwtPayload = {
    _id: user._id.toString(),
    email: user.email,
    role: user.role,
    organizationId: user.organizationId?.toString(),
  };

  const accessToken = jwt.sign(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET!,
    { expiresIn: envVars.JWT_ACCESS_EXPIRES as jwt.SignOptions["expiresIn"], }
  );

  const refreshToken = jwt.sign(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET!,
    { expiresIn: envVars.JWT_REFRESH_EXPIRES as jwt.SignOptions["expiresIn"], }
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }

}

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken
};


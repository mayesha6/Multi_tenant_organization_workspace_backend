import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { OrganizationServices } from "./organization.services";

const createOrganization = catchAsync(async (req: Request, res: Response) => {
  const result = await OrganizationServices.createOrganization(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Organization created successfully",
    data: result,
  });
});

const getAllOrganizations = catchAsync(async (_req: Request, res: Response) => {
  const result = await OrganizationServices.getAllOrganizations();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Organizations retrieved successfully",
    data: result,
  });
});

const getOrganizationById = catchAsync(async (req: Request, res: Response) => {
  const result = await OrganizationServices.getOrganizationById(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Organization retrieved successfully",
    data: result,
  });
});

const updateOrganization = catchAsync(async (req: Request, res: Response) => {
  const result = await OrganizationServices.updateOrganization(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Organization updated successfully",
    data: result,
  });
});

const deleteOrganization = catchAsync(async (req: Request, res: Response) => {
  const result = await OrganizationServices.deleteOrganization(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Organization deleted successfully",
    data: result,
  });
});

export const OrganizationControllers = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
};

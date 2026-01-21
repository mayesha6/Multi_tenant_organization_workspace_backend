import httpStatus from "http-status-codes";
import slugify from "slugify";
import AppError from "../../errorHelpers/AppError";
import { Organization } from "./organization.model";

const createOrganization = async (payload: { name: string }) => {
  const slug = slugify(payload.name, { lower: true });

  const isExists = await Organization.findOne({ slug });
  if (isExists) {
    throw new AppError(httpStatus.CONFLICT, "Organization already exists");
  }

  const organization = await Organization.create({
    name: payload.name,
    slug,
  });

  return organization;
};

const getAllOrganizations = async () => {
  return Organization.find({ isDeleted: false });
};

const getOrganizationById = async (id: string) => {
  const organization = await Organization.findOne({
    _id: id,
    isDeleted: false,
  });
  if (!organization) {
    throw new AppError(httpStatus.NOT_FOUND, "Organization not found");
  }
  return organization;
};

const updateOrganization = async (id: string, payload: { name?: string }) => {
  const organization = await Organization.findOne({
    _id: id,
    isDeleted: false,
  });
  if (!organization) {
    throw new AppError(httpStatus.NOT_FOUND, "Organization not found");
  }

  if (payload.name) {
    const slug = slugify(payload.name, { lower: true });
    const isExists = await Organization.findOne({ slug, _id: { $ne: id } });
    if (isExists) {
      throw new AppError(
        httpStatus.CONFLICT,
        "Organization name already exists",
      );
    }
    organization.name = payload.name;
    organization.slug = slug;
  }

  await organization.save();
  return organization;
};

const deleteOrganization = async (id: string) => {
  const organization = await Organization.findOne({
    _id: id,
    isDeleted: false,
  });
  if (!organization) {
    throw new AppError(httpStatus.NOT_FOUND, "Organization not found");
  }

  organization.isDeleted = true;
  await organization.save();
  return organization;
};

export const OrganizationServices = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
};

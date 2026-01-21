import express from "express";
import { OrganizationControllers } from "./organization.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { OrganizationValidations } from "./organization.validation";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

const router = express.Router();

router.post(
  "/",
  checkAuth(Role.PLATFORM_ADMIN),
  validateRequest(OrganizationValidations.createOrganizationSchema),
  OrganizationControllers.createOrganization
);

router.get(
  "/",
  checkAuth(Role.PLATFORM_ADMIN),
  OrganizationControllers.getAllOrganizations
);

router.get(
  "/:id",
  checkAuth(Role.PLATFORM_ADMIN),
  OrganizationControllers.getOrganizationById
);

router.patch(
  "/:id",
  checkAuth(Role.PLATFORM_ADMIN),
  validateRequest(OrganizationValidations.createOrganizationSchema),
  OrganizationControllers.updateOrganization
);

router.delete(
  "/:id",
  checkAuth(Role.PLATFORM_ADMIN),
  OrganizationControllers.deleteOrganization
);

export const OrganizationRoutes = router;

import express from "express";
import { ProjectControllers } from "./project.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { ProjectValidations } from "./project.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

router.post(
  "/",
  checkAuth(Role.ORGANIZATION_ADMIN),
  validateRequest(ProjectValidations.createProjectSchema),
  ProjectControllers.createProject,
);

router.get(
  "/",
  checkAuth(
    Role.PLATFORM_ADMIN,
    Role.ORGANIZATION_ADMIN,
    Role.ORGANIZATION_MEMBER,
  ),
  ProjectControllers.getAllProjects,
);

router.patch(
  "/:id",
  checkAuth(Role.PLATFORM_ADMIN, Role.ORGANIZATION_ADMIN),
  validateRequest(ProjectValidations.updateProjectSchema),
  ProjectControllers.updateProject,
);

router.delete(
  "/:id",
  checkAuth(Role.PLATFORM_ADMIN, Role.ORGANIZATION_ADMIN),
  ProjectControllers.deleteProject,
);

export const ProjectRoutes = router;

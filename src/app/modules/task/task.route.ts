import express from "express";
import { TaskControllers } from "./task.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { TaskValidations } from "./task.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/",
  checkAuth(Role.ORGANIZATION_ADMIN),
  validateRequest(TaskValidations.createTaskSchema),
  TaskControllers.createTask
);

router.get(
  "/",
  checkAuth(Role.ORGANIZATION_ADMIN),
  TaskControllers.getAllTasks
);

router.get(
  "/:id",
  checkAuth(Role.ORGANIZATION_ADMIN),
  TaskControllers.getTaskById
);

router.put(
  "/:id",
  checkAuth(Role.ORGANIZATION_ADMIN),
  validateRequest(TaskValidations.updateTaskSchema),
  TaskControllers.updateTask
);

router.delete(
  "/:id",
  checkAuth(Role.ORGANIZATION_ADMIN),
  TaskControllers.deleteTask
);

export const TaskRoutes = router;

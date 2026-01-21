import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { Role } from "./user.interface";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { multerUpload } from "../../config/multer.config";
import { parseFormDataMiddleware } from "../../middlewares/parseFormDataMiddleware";

const router = Router();

router.post(
  "/register-organization-admin",
  checkAuth(Role.PLATFORM_ADMIN),
  validateRequest(createUserZodSchema),
  UserControllers.createOrganizationAdmin,
);
router.post(
  "/register-organization-member",
  checkAuth(Role.ORGANIZATION_ADMIN),
  validateRequest(createUserZodSchema),
  UserControllers.createUser,
);
router.get(
  "/all-users",
  checkAuth(Role.ORGANIZATION_ADMIN),
  UserControllers.getAllUsers,
);
router.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe);
router.patch(
  "/update-my-profile",
  checkAuth(...Object.values(Role)),
  multerUpload.single("file"),
  parseFormDataMiddleware,
  validateRequest(updateUserZodSchema),
  UserControllers.updateMyProfile,
);
router.get(
  "/:id",
  checkAuth(Role.PLATFORM_ADMIN, Role.ORGANIZATION_ADMIN),
  UserControllers.getSingleUser,
);
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  checkAuth(...Object.values(Role)),
  UserControllers.updateUser,
);

export const UserRoutes = router;

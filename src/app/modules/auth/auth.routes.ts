import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { AuthControllers } from "./auth.controller";

const router = Router()

router.post("/login", AuthControllers.credentialsLogin);
router.post("/logout", checkAuth(...Object.values(Role)), AuthControllers.logout);

export const AuthRoutes = router;
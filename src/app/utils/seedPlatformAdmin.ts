import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const seedPlatformAdmin = async () => {
    try {
        const isPlatformAdminExist = await User.findOne({ email: envVars.PLATFORM_ADMIN_EMAIL })

        if (isPlatformAdminExist) {
            console.log("Platform Admin Already Exists!");
            return;
        }

        console.log("Trying to create Platform Admin...");

        const hashedPassword = await bcryptjs.hash(envVars.PLATFORM_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND))

        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: envVars.PLATFORM_ADMIN_EMAIL
        }

        const payload = {
            name: "Platform admin",
            role: Role.PLATFORM_ADMIN,
            email: envVars.PLATFORM_ADMIN_EMAIL,
            password: hashedPassword,
            auths: [authProvider]
        }

        const platformAdmin = await User.create(payload)
        console.log("Platform Admin Created Successfuly! \n");
        console.log(platformAdmin);
    } catch (error) {
        console.log(error);
    }
}
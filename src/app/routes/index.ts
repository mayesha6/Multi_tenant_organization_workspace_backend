import { Router } from "express"
import { UserRoutes } from "../modules/user/user.routes"
import { AuthRoutes } from "../modules/auth/auth.routes"
import { OrganizationRoutes } from "../modules/organization/organization.routes"
import { ProjectRoutes } from "../modules/project/project.route"
import { TaskRoutes } from "../modules/task/task.route"


export const router = Router()

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/organization",
        route: OrganizationRoutes
    },
    {
        path: "/project",
        route: ProjectRoutes
    },
    {
        path: "/task",
        route: TaskRoutes
    },
       

]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})


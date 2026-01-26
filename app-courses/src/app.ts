import express from "express"
import { router as routerCourse } from "./features/courses/course-routes"
import { router as routerUser } from "./features/users/user-routes"

class App {
    public app: express.Application

    constructor() {
        this.app = express()

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        this.mountRoutesUser()
    }

    private mountRoutesUser(): void {
        this.app.use("/courses", routerCourse)
        this.app.use("/users", routerUser)

    }
}

export const app = new App().app


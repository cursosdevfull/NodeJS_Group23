import express, { Request, Response } from "express"

class CourseRoutes {
    router: express.Router

    constructor() {
        this.router = express.Router()
        this.mountRoutes()
    }

    private mountRoutes(): void {
        this.router.get("/", (req: Request, res: Response) => {
            res.send("Hello World")
        })
    }
}

export const router = new CourseRoutes().router




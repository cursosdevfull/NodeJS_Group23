import express, { Request, Response } from "express"
import { UserData } from "./data/user"

class UserRoutes {
    router: express.Router

    private users: UserData[] = [
        { id: 1, name: "John Doe", email: "john.doe@example.com", password: "pass123", roles: [{ id: 1, name: "Admin" }], active: true, createdAt: new Date("2025-01-01"), updatedAt: undefined },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", password: "pass123", roles: [{ id: 2, name: "User" }], active: true, createdAt: new Date("2025-01-02"), updatedAt: undefined },
        { id: 3, name: "Michael Johnson", email: "michael.j@example.com", password: "pass123", roles: [{ id: 3, name: "Moderator" }], active: true, createdAt: new Date("2025-01-03"), updatedAt: undefined },
        { id: 4, name: "Emily Davis", email: "emily.davis@example.com", password: "pass123", roles: [{ id: 2, name: "User" }], active: true, createdAt: new Date("2025-01-04"), updatedAt: undefined },
        { id: 5, name: "David Wilson", email: "david.wilson@example.com", password: "pass123", roles: [{ id: 1, name: "Admin" }, { id: 3, name: "Moderator" }], active: true, createdAt: new Date("2025-01-05"), updatedAt: undefined },
        { id: 6, name: "Sarah Brown", email: "sarah.brown@example.com", password: "pass123", roles: [{ id: 2, name: "User" }], active: true, createdAt: new Date("2025-01-06"), updatedAt: undefined },
        { id: 7, name: "James Martinez", email: "james.martinez@example.com", password: "pass123", roles: [{ id: 4, name: "Editor" }], active: true, createdAt: new Date("2025-01-07"), updatedAt: undefined },
        { id: 8, name: "Linda Garcia", email: "linda.garcia@example.com", password: "pass123", roles: [{ id: 2, name: "User" }], active: false, createdAt: new Date("2025-01-08"), updatedAt: new Date("2025-01-15") },
        { id: 9, name: "Robert Anderson", email: "robert.anderson@example.com", password: "pass123", roles: [{ id: 3, name: "Moderator" }], active: true, createdAt: new Date("2025-01-09"), updatedAt: undefined },
        { id: 10, name: "Patricia Thomas", email: "patricia.thomas@example.com", password: "pass123", roles: [{ id: 2, name: "User" }], active: true, createdAt: new Date("2025-01-10"), updatedAt: undefined },
        { id: 11, name: "Christopher Lee", email: "christopher.lee@example.com", password: "pass123", roles: [{ id: 4, name: "Editor" }], active: true, createdAt: new Date("2025-01-11"), updatedAt: undefined },
        { id: 12, name: "Maria Rodriguez", email: "maria.rodriguez@example.com", password: "pass123", roles: [{ id: 2, name: "User" }], active: true, createdAt: new Date("2025-01-12"), updatedAt: undefined },
        { id: 13, name: "Daniel White", email: "daniel.white@example.com", password: "pass123", roles: [{ id: 1, name: "Admin" }], active: false, createdAt: new Date("2025-01-13"), updatedAt: new Date("2025-01-18") },
        { id: 14, name: "Jessica Taylor", email: "jessica.taylor@example.com", password: "pass123", roles: [{ id: 3, name: "Moderator" }], active: true, createdAt: new Date("2025-01-14"), updatedAt: undefined },
        { id: 15, name: "Matthew Harris", email: "matthew.harris@example.com", password: "pass123", roles: [{ id: 2, name: "User" }], active: true, createdAt: new Date("2025-01-15"), updatedAt: undefined },
        { id: 16, name: "Ashley Clark", email: "ashley.clark@example.com", password: "pass123", roles: [{ id: 4, name: "Editor" }], active: true, createdAt: new Date("2025-01-16"), updatedAt: undefined },
        { id: 17, name: "Andrew Lewis", email: "andrew.lewis@example.com", password: "pass123", roles: [{ id: 2, name: "User" }], active: true, createdAt: new Date("2025-01-17"), updatedAt: undefined },
        { id: 18, name: "Melissa Walker", email: "melissa.walker@example.com", password: "pass123", roles: [{ id: 1, name: "Admin" }, { id: 4, name: "Editor" }], active: true, createdAt: new Date("2025-01-18"), updatedAt: undefined },
        { id: 19, name: "Joshua Hall", email: "joshua.hall@example.com", password: "pass123", roles: [{ id: 3, name: "Moderator" }], active: true, createdAt: new Date("2025-01-19"), updatedAt: undefined },
        { id: 20, name: "Amanda Allen", email: "amanda.allen@example.com", password: "pass123", roles: [{ id: 2, name: "User" }], active: true, createdAt: new Date("2025-01-20"), updatedAt: undefined }
    ]


    constructor() {
        this.router = express.Router()
        this.mountRoutes()
    }

    private expand(fields: string[]) {
        return (user: UserData) => ({ ...user, roles: (fields.includes("roles")) ? user.roles : user.roles.map(role => role.id) })
    }

    private mountRoutes(): void {
        this.router.get("/", (req: Request, res: Response) => {
            const { page, limit, expand } = req.query;
            const fields = (Array.isArray(expand) ? expand : (expand ? [expand] : [])) as string[];
            console.log("Expand fields:", fields);

            if (page && limit) {
                const pageNumber = parseInt(page as string, 10);
                const limitNumber = parseInt(limit as string, 10);
                const startIndex = (pageNumber - 1) * limitNumber;
                const endIndex = startIndex + limitNumber;
                const paginatedUsers = this.users.slice(startIndex, endIndex);
                const data = paginatedUsers.map(this.expand(fields));
                res.json(data)
                return;
            }

            const data = this.users.map(this.expand(fields));

            res.json(data)
        })

        this.router.get("/:id", (req: Request, res: Response) => {
            const { id } = req.params
            res.send(`User ID: ${id}`)
        })

        this.router.post("/", (req: Request, res: Response) => {
            console.log(req.body)
            res.send("User created")
        })

        this.router.put("/:id", (req: Request, res: Response) => {
            const { id } = req.params
            res.send(`User ID: ${id} updated`)
        })

        this.router.delete("/:id", (req: Request, res: Response) => {
            const { id } = req.params
            res.send(`User ID: ${id} deleted`)
        })
    }
}

export const router = new UserRoutes().router
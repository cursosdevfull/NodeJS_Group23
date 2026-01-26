import http from "http"
import { app } from "./app"

const server = http.createServer(app)

const PORT = 3000

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

process.on("uncaughtException", error => {
    console.error("Uncaught Exception:", error)
    process.exit(1)
})

process.on("unhandledRejection", error => {
    console.error("Unhandled Rejection:", error)
    process.exit(1)
})

process.on("SIGINT", () => {
    console.log("Received SIGINT. Leaving...")
    process.exit(0)
})

process.on("SIGTERM", () => {
    console.log("Received SIGTERM. Leaving...")
    process.exit(0)
})

process.on("exit", () => {
    console.log("Process exit")
    console.log("Terminating process pending")
})
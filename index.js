const http = require("http")
const application = require("./app")

const server = http.createServer(application.app)
server.listen(3000, () => console.log("Server is running on port 3000"))

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
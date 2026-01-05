const http = require("http")
const application = require("./app")

const server = http.createServer(application.app)
server.listen(3000, () => console.log("Server is running on port 3000"))
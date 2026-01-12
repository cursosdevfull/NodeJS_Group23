const errorsControllers = require("./features/core/errors/errors.controller")
const utilsRoutes = require("./features/utils/utils.routes")
const usersRoutes = require("./features/users/users.routes")
const express = require("express")
const app = express()

app.use("/users", usersRoutes.routes)
app.use("/utils", utilsRoutes.routes)

app.use(errorsControllers.PathNotFound)
module.exports = { app }
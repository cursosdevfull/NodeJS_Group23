const usersController = require("./users.controller")
const express = require("express")

const routes = new express.Router()

routes.get("/", usersController.getUsers)
routes.get("/active", usersController.getUsersActive)
routes.post("/create", usersController.postUsers)
routes.get("/page/all", usersController.getUsersByPage)

module.exports = { routes }
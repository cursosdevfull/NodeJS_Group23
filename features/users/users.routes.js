const usersController = require("./users.controller")

const routes = [
    {
        path: "",
        method: "GET",
        ftn: usersController.getUsers
    },
    {
        path: "active",
        method: "GET",
        ftn: usersController.getUsersActive
    },
    {
        path: "create",
        method: "POST",
        ftn: usersController.postUsers
    },
    {
        path: "page/all",
        method: "GET",
        ftn: usersController.getUsersByPage
    }
]

module.exports = { routes }
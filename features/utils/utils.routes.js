const utilsController = require("./utils.controller")
const express = require("express")

const routes = new express.Router()

routes.get("/home", utilsController.getHome)
routes.get("/download-file", utilsController.getDownloadFile)
routes.get("/book-kouzine", utilsController.getBookKouzine)
routes.get("/video", utilsController.getStreamingVideo)

module.exports = { routes }
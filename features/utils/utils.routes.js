const utilsController = require("./utils.controller")

const routes = [
    {
        path: "home",
        method: "GET",
        ftn: utilsController.getHome
    },
    {
        path: "download-file",
        method: "GET",
        ftn: utilsController.getDownloadFile
    },
    {
        path: "book-kouzine",
        method: "GET",
        ftn: utilsController.getBookKouzine
    },
    {
        path: "video",
        method: "GET",
        ftn: utilsController.getStreamingVideo
    }
]

module.exports = { routes }
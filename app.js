const errorsControllers = require("./features/core/errors/errors.controller")
const utilsRoutes = require("./features/utils/utils.routes")
const usersRoutes = require("./features/users/users.routes")

const paths = [
    {
        path: "users",
        children: usersRoutes
    },
    {
        path: "utils",
        children: utilsRoutes
    }
]

function SearchPath(url, method) {
    let divs = url.split("/");
    if (divs.length > 2) divs = [...divs.slice(0, 1), divs.slice(1).join("/")]
    const [routeParent, routeChild] = divs;
    const routeParentFound = paths.find(path => path.path === routeParent)
    if (!routeParentFound || !routeParentFound.children) return null

    return routeParentFound.children.routes.find(path => path.path === (routeChild || "") && path.method === method)
}

async function app(request, response) {
    const url = request.url.toLowerCase().slice(1)
    const method = request.method.toUpperCase()

    const timeStart = new Date().getTime()

    /*try {*/
    const pathFound = SearchPath(url, method)
    pathFound ? await pathFound.ftn(response) : errorsControllers.PathNotFound(response)
    /*} catch (error) {
        response.writeHead(500, { "content-type": "text/plain" })
        response.end(`Error: ${error}`)
    } finally {
        const timeEnd = new Date().getTime()
        console.log(`Execution took ${timeEnd - timeStart} ms`)
    }*/
}

module.exports = { app }
const fs = require("fs")

function getUsers(response) {
    const users = [{ id: 1, username: "user01" }, { id: 2, username: "user02" }, { id: 3, username: "user03" }]
    response.writeHead(200, { "content-type": "application/json" })
    response.end(JSON.stringify(users))
}

function postUsers(response) {
    const users = [{ id: 4, username: "user04" }, { id: 5, username: "user05" }, { id: 6, username: "user06" }]
    response.writeHead(200, { "content-type": "application/json" })
    response.end(JSON.stringify(users))
}

function getHome(response) {
    response.writeHead(200, { "content-type": "text/html" })
    response.end("<h1>Home</h1>")
}

function getDownloadFile(response) {
    const content = fs.readFileSync("./index.html")
    response.writeHead(200, { "content-type": "text/html" })
    response.end(content)
}

function getBookKouzine(response) {
    fs.readFile("./libro-recetas.pdf", (err, content) => {
        if (err) response.end();
        response.writeHead(200, { "content-type": "application/pdf" })
        response.end(content)
    })
}

function getVideo(response) {
    response.writeHead(200, { "content-type": "video/mp4" })
    const stream = fs.createReadStream("./video.mp4")
    stream.pipe(response)
}


const paths = [
    {
        path: "/users",
        method: "GET",
        ftn: getUsers
        /*  ftn: (response) => {
             const users = [{ id: 1, username: "user01" }, { id: 2, username: "user02" }, { id: 3, username: "user03" }]
             response.writeHead(200, { "content-type": "application/json" })
             response.end(JSON.stringify(users))
         } */
    },
    {
        path: "/users",
        method: "POST",
        ftn: postUsers
    },
    {
        path: "/home",
        method: "GET",
        ftn: getHome
    },
    {
        path: "/download-file",
        method: "GET",
        ftn: getDownloadFile
    },
    {
        path: "/book-kouzine",
        method: "GET",
        ftn: getBookKouzine
    },
    {
        path: "/video",
        method: "GET",
        ftn: getVideo
    }
]

function SearchPath(url, method) {
    return paths.find(path => path.path.startsWith(url) && path.method === method)
}

function PathNotFound(response) {
    response.writeHead(404, { "content-type": "text/plain" })
    response.end("Path not found")

}

function app(request, response) {
    const url = request.url
    const method = request.method.toUpperCase()

    const pathFound = SearchPath(url, method)
    pathFound ? pathFound.ftn(response) : PathNotFound(response)

    /*   if (url.startsWith("/users")) {
          const users = [{ id: 1, username: "user01" }, { id: 2, username: "user02" }, { id: 3, username: "user03" }]
          response.writeHead(200, { "content-type": "application/json" })
          response.end(JSON.stringify(users))
      } else if (url.startsWith("/home")) {
          response.writeHead(200, { "content-type": "text/html" })
          response.end("<h1>Home</h1>")
      } else if (url.startsWith("/download-file")) {
          const content = fs.readFileSync("./index.html")
          response.writeHead(200, { "content-type": "text/html" })
          response.end(content)
      } else if (url.startsWith("/book-kouzine")) {
          fs.readFile("./libro-recetas.pdf", (err, content) => {
              if (err) response.end();
              response.writeHead(200, { "content-type": "application/pdf" })
              response.end(content)
          })
      } else if (url.startsWith("/video")) {
          response.writeHead(200, { "content-type": "video/mp4" })
          const stream = fs.createReadStream("./video.mp4")
          stream.pipe(response)
      } else {
          response.writeHead(404, { "content-type": "text/plain" })
          response.end("Ruta no existe")
      } */


    //console.log("Hola mundo")
    /*     response.writeHead(204, { "content-type": "text/html; charset=utf8" })
        response.end()
     */

    /*     console.log("request.url", request.url)
    
        response.writeHead(200, { "content-type": "text/html; charset=utf8" })
        response.write("<h1>Hello friends from Perú!</h1>")
        response.write("<h2>Mañana nos vemos</h2>")
        response.end("Bye") */
}

module.exports = { app }
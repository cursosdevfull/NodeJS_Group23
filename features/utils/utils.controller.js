const fs = require("fs")

function getHome(request, response) {
    response.type("text/html").send("<h1>Home</h1>")
}

function getDownloadFile(request, response) {
    const content = fs.readFileSync("./index.html")
    response.type("text/html").send(content)
}

function getBookKouzine(request, response) {
    fs.readFile("./libro-recetas.pdf", (err, content) => {
        if (err) return response.send();
        response.type("application/pdf").send(content)
    })
}

function getStreamingVideo(request, response) {
    response.writeHead(200, { "content-type": "video/mp4" })
    const stream = fs.createReadStream("./video.mp4")
    stream.pipe(response)
}

module.exports = { getHome, getDownloadFile, getBookKouzine, getStreamingVideo }
const fs = require("fs")

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
        if (err) return response.end();
        response.writeHead(200, { "content-type": "application/pdf" })
        response.end(content)
    })
}

function getStreamingVideo(response) {
    response.writeHead(200, { "content-type": "video/mp4" })
    const stream = fs.createReadStream("./video.mp4")
    stream.pipe(response)
}

module.exports = { getHome, getDownloadFile, getBookKouzine, getStreamingVideo }
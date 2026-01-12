function PathNotFound(response) {
    response.writeHead(404, { "content-type": "text/plain" })
    response.end("Path not found")
}

module.exports = { PathNotFound }
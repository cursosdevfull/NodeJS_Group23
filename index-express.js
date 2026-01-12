const express = require("express")

const app = express()

app.get("/", (request, response) => {
    response.send("Hello World!")
})

app.listen(3000, () => console.log("App running on port 3000"))
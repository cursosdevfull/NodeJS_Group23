function getUsers(response) {
    const users = [{ id: 1, username: "user01" }, { id: 2, username: "user02" }, { id: 3, username: "user03" }]
    response.writeHead(200, { "content-type": "application/json" })
    response.end(JSON.stringify(users))
}

function listUsers() {
    const random = Math.round(Math.random() * 4 + 1) * 1000

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = [{ id: 7, username: "user07" }, { id: 8, username: "user08" }, { id: 9, username: "user09" }]
            resolve(users)
        }, random);
    })
}

async function getUsersActive(response) {
    const users = await listUsers()
    response.writeHead(200, { "content-type": "application/json" })
    response.end(JSON.stringify(users))
}

function postUsers(response) {
    const users = [{ id: 4, username: "user04" }, { id: 5, username: "user05" }, { id: 6, username: "user06" }]
    response.writeHead(200, { "content-type": "application/json" })
    response.end(JSON.stringify(users))
}

function getUsersByPage(response) {
    process.kill(process.pid, "SIGTERM")

    setTimeout(() => {
        //throw "An error happened"
        const users = [{ id: 5, username: "user05" }, { id: 6, username: "user06" }]
        response.writeHead(200, { "content-type": "application/json" })
        response.end(JSON.stringify(users))
    }, 1000);
}

module.exports = { getUsers, postUsers, getUsersByPage, getUsersActive }
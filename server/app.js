const http = require("http");
const path = require("path");
const fs = require("fs");
const router = require("./router");

const server = http.createServer((req, res) => {
    router(req, res);
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

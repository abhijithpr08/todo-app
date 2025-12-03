const fs = require("fs");
const path = require("path");
const { getTodos, addTodo, deleteTodo } = require("./controllers");

module.exports = (req, res) => {

    if (req.method === "GET" && req.url === "/") {
        fs.readFile(path.join(__dirname, "../public/index.html"), "utf8", (err, data) => {
            res.end(data);
        });
    }

    else if (req.url === "/todo.css") {
        fs.readFile(path.join(__dirname, "../public/todo.css"), (err, data) => {
            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(data);
        });
    }

    else if (req.url === "/script.js") {
        fs.readFile(path.join(__dirname, "../public/script.js"), (err, data) => {
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.end(data);
        });
    }

    else if (req.method === "GET" && req.url === "/api/todos") {
        getTodos(req, res);
    }

    else if (req.method === "POST" && req.url === "/api/todos") {
        addTodo(req, res);
    }

    else if (req.method === "DELETE" && req.url.startsWith("/api/todos/")) {
        const id = req.url.split("/")[3];
        deleteTodo(req, res, id);
    }

    else {
        res.writeHead(404);
        res.end("404 Not Found");
    }
};

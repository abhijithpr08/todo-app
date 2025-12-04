const fs = require("fs");
const path = require("path");
const { getTodos, addTodo, deleteTodo, updateTodo } = require("./controllers");

const render = (res, file, type) => {
    fs.readFile(file, (err, data) => {
        if (err) return res.end("File error");
        res.writeHead(200, { "Content-Type": type });
        res.end(data);
    });
};

module.exports = (req, res) => {

    if (req.method === "GET" && req.url === "/")
        return render(res, path.join(__dirname, "../public/index.html"), "text/html");

    if (req.url === "/todo.css")
        return render(res, path.join(__dirname, "../public/todo.css"), "text/css");

    if (req.url === "/script.js")
        return render(res, path.join(__dirname, "../public/script.js"), "application/javascript");

    if (req.method === "GET" && req.url === "/api/todos")
        return getTodos(req, res);

    if (req.method === "POST" && req.url === "/api/todos")
        return addTodo(req, res);

    if (req.method === "DELETE" && req.url.startsWith("/api/todos/")) {
        const id = req.url.split("/")[3];
        return deleteTodo(req, res, id);
    }

    if (req.method === "PUT" && req.url.startsWith("/api/todos/")) {
        const id = req.url.split("/")[3];
        return updateTodo(req, res, id);
    }
    res.writeHead(404);
    res.end("404 Not Found");
};
let todos = [];

function getTodos(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
}

function addTodo(req, res) {
    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () => {
        const data = JSON.parse(body);

        const newTodo = {
            id: Date.now(),
            task: data.task
        };

        todos.push(newTodo);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newTodo));
    });
}

function deleteTodo(req, res, id) {
    todos = todos.filter(todo => todo.id != id);

    res.writeHead(200);
    res.end("Deleted");
}

module.exports = {
    getTodos,
    addTodo,
    deleteTodo
};

const Todo = require("./models/Todo");

async function getTodos(req, res) {
    try {
        const todos = await Todo.find();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todos));

    } catch (err) {
        res.writeHead(500);
        res.end("DB Error");
    }
}

function addTodo(req, res) {
    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", async () => {
        try {
            const data = JSON.parse(body);

            const newTodo = new Todo({
                task: data.task
            });

            await newTodo.save();

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newTodo));

        } catch (err) {
            console.log(err);
            res.writeHead(500);
            res.end("Add error");
        }
    });
}

async function deleteTodo(req, res, id) {
    try {
        await Todo.findByIdAndDelete(id);
        res.writeHead(200);
        res.end("Deleted");

    } catch {
        res.writeHead(500);
        res.end("Delete error");
    }
}

function updateTodo(req, res, id) {
    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", async () => {
        try {

            const data = JSON.parse(body);

            await Todo.findByIdAndUpdate(id, {
                status: data.status
            });

            res.writeHead(200);
            res.end("Updated");

        } catch {
            res.writeHead(500);
            res.end("Update error");
        }
    });
}

module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo
};

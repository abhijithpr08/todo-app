const {
    createOne,
    findAll,
    updateById,
    deleteById
} = require("./db");

async function getTodos(req, res) {

    const todos = await findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
}

function addTodo(req, res) {

    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", async () => {

        const data = JSON.parse(body);

        const id = await createOne({
            task: data.task
        });

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            _id: id,
            task: data.task,
            status: "pending"
        }));
    });
}

function updateTodo(req, res, id) {

    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", async () => {

        const data = JSON.parse(body);

        await updateById(id, {
            status: data.status
        });

        res.writeHead(200);
        res.end("Updated");
    });
}

async function deleteTodo(req, res, id) {

    await deleteById(id);

    res.writeHead(200);
    res.end("Deleted");
}


module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo
};

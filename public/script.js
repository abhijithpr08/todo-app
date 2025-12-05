const list = document.getElementById("todoList");

fetchTodos();

function fetchTodos() {
    fetch("/api/todos")
        .then(res => res.json())
        .then(data => {

            list.innerHTML = "";

            data.forEach(todo => {

                const li = document.createElement("li");

                const isCompleted = todo.status === "completed";

                li.innerHTML = `
        <div class="check">
            <input type="checkbox"
                ${isCompleted ? "checked" : ""}
                onchange="updateTodo('${todo._id}', this.checked)">
        </div>

        <div class="taskname" style="text-decoration:${isCompleted ? "line-through" : "none"}">
            ${todo.task}
        </div>

        <button onclick="deleteTodo('${todo._id}')">Delete</button>
    `;

                list.appendChild(li);
            });
        });
}

function addTodo() {

    const input = document.getElementById("taskInput");

    const task = input.value.trim();

    if (!task) {
        alert("Enter task!");
        return;
    }

    fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
    })
    .then(() => {
        input.value = "";
        fetchTodos();
    });
}

function deleteTodo(id) {
    fetch("/api/todos/" + id, {
        method: "DELETE"
    })
    .then(fetchTodos);
}

function updateTodo(id, isCompleted) {

    fetch("/api/todos/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            status: isCompleted ? "completed" : "pending"
        })
    })
    .then(fetchTodos);
}

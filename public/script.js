const list = document.getElementById("todoList");

fetchTodos();

function fetchTodos() {
    fetch("/api/todos")
    .then(res => res.json())
    .then(data => {
        list.innerHTML = "";

        data.forEach(todo => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${todo.task}
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            `;
            list.appendChild(li);
        });
    });
}

function addTodo() {
    const input = document.getElementById("taskInput");
    const task = input.value;

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
    .then(() => fetchTodos());
}

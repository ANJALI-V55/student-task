const taskInput = document.getElementById('task');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');

// 1. Load tasks from the server
async function loadTasks() {
    try {
        const res = await fetch('/api/tasks');
        const tasks = await res.json();
        
        list.innerHTML = ""; // Clear current list
        tasks.forEach(task => {
            const li = document.createElement("li");
            // This works whether 'task' is a string or an object with .text
            li.textContent = typeof task === 'object' ? task.text : task;
            list.appendChild(li);
        });
    } catch (err) {
        console.error("Error loading tasks:", err);
    }
}

// 2. Add a new task
addBtn.addEventListener("click", async () => {
    const text = taskInput.value.trim();
    if (!text) return;

    try {
        await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: text }) // Match the backend 'req.body.task'
        });

        taskInput.value = "";
        loadTasks(); // Refresh list immediately
    } catch (err) {
        console.error("Error adding task:", err);
    }
});

// Initial load when page opens
loadTasks();
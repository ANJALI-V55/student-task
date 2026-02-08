const taskInput = document.getElementById('task');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');

async function loadTasks() {
    try {
        const res = await fetch("/api/tasks");
        const tasks = await res.json();
        
        list.innerHTML = ""; 
        tasks.forEach(task => {
            const li = document.createElement("li");
            // Displays the task whether it's a string or object
            li.textContent = typeof task === 'object' ? (task.text || task.task) : task;
            list.appendChild(li);
        });
    } catch (err) {
        console.error("Error loading tasks:", err);
    }
}

addBtn.addEventListener("click", async () => {
    const text = taskInput.value.trim();
    if (!text) return;

    try {
        await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: text }) // Matches index.js
        });

        taskInput.value = "";
        await loadTasks(); 
    } catch (err) {
        console.error("Error adding task:", err);
    }
});

loadTasks();
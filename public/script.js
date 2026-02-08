const list = document.getElementById("list");
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("task");

function loadTasks() {
  fetch("/tasks")
    .then(res => res.json())
    .then(tasks => {
      list.innerHTML = "";
      tasks.forEach(t => {
        const li = document.createElement("li");
        li.textContent = t.text;
        list.appendChild(li);
      });
    })
    .catch(err => console.error(err));
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;

  fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  }).then(() => {
    taskInput.value = "";
    loadTasks();
  });
});

loadTasks();
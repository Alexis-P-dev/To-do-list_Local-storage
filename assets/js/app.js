const form = document.getElementById('form');
const titleNote = document.getElementById('title');
const todoListContainer = document.getElementById('todo-list');

// Charger les tâches
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

// Sauvegarder
function saveToLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Affichage
function renderTodoList() {
    todoListContainer.innerHTML = "";

    todoList.forEach((item, index) => {
        const li = document.createElement("li");

        // --- Partie gauche : checkbox + titre ---
        const left = document.createElement("div");
        left.className = "todo-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.done;

        checkbox.addEventListener('change', () => {
            item.done = checkbox.checked;
            saveToLocalStorage();
        });

        const title = document.createElement("span");
        title.textContent = item.title;
        if (item.done) title.style.textDecoration = "line-through";

        checkbox.addEventListener("change", () => {
            item.done = checkbox.checked;
            saveToLocalStorage();
            renderTodoList();
        });

        left.appendChild(checkbox);
        left.appendChild(title);

        // --- Partie droite : boutons ---
        const actions = document.createElement("div");
        actions.className = "todo-actions";

        // Bouton supprimer
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Supr";

        deleteBtn.addEventListener("click", () => {
            todoList.splice(index, 1);
            saveToLocalStorage();
            renderTodoList();
        });

        // Bouton modifier
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", () => {
            const newTitle = prompt("Modifier la tâche :", item.title);
            if (newTitle !== null && newTitle.trim() !== "") {
                item.title = newTitle;
                saveToLocalStorage();
                renderTodoList();
            }
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(left);
        li.appendChild(actions);

        todoListContainer.appendChild(li);
    });
}

// Afficher dès le début
renderTodoList();

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (titleNote.value.trim() === "") {
        alert("Aucune info renseignée");
        return;
    }

    todoList.push({
        title: titleNote.value,
        done: false,
        createdAt: new Date().toISOString()
    });

    saveToLocalStorage();
    renderTodoList();

    titleNote.value = "";
});

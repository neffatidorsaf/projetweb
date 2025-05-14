const inputBox = document.getElementById("input-box");//el input box
const listContainer = document.getElementById("list-container");//lista

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let taskText = inputBox.value;

        // Ajoute la tâche visuellement
        let li = document.createElement("li");
        li.innerHTML = taskText;//task entré sous forme de liste

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);//ajout de liste lel list container
        saveData();

        // Envoi AJAX vers JSONPlaceholder
        sendTaskToServer(taskText);
    }

    inputBox.value = '';
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || '';
}

showTask();


function sendTaskToServer(taskText) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: taskText,
            body: "Ma tâche à faire",
            userId: 1
        })
    })
    .then(response => {
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
        return response.json();
    })
    .then(data => {
        console.log("✅ Tâche envoyée :", data);
    })
    .catch(error => {
        console.error("❌ Erreur lors de l'envoi :", error);
    });
}

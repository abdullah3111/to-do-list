document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const overlay = document.getElementById('overlay');
    const taskForm = document.getElementById('taskForm');
    const submitTaskBtn = document.getElementById('submitTaskBtn');
    const tasksContainer = document.getElementById('tasks');

    const tasks = [];

    addTaskBtn.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });

    submitTaskBtn.addEventListener('click', () => {
        addTask();
        overlay.style.display = 'none';
        clearForm();
    });

    function addTask() {
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;

        if (title && date && description) {
            const task = {
                title,
                date,
                description
            };

            tasks.push(task);
            displayTasks();
        }
    }

    function displayTasks() {
        tasksContainer.innerHTML = '';

        tasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.innerHTML = `
                <strong> ${task.date} <br> Title: ${task.title}</strong> <br>
                Description: ${task.description}
                <br>
                <div class="actions">
                    <button class="edit" onclick="editTask(${index})">Edit</button>
                    <button class="delete" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            tasksContainer.appendChild(taskDiv);
        });
    }

    function clearForm() {
        document.getElementById('title').value = '';
        document.getElementById('date').value = '';
        document.getElementById('description').value = '';
    }

    // Function to delete a task
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        displayTasks();
    };

    // Function to edit a task
    window.editTask = function(index) {
        const task = tasks[index];
        document.getElementById('title').value = task.title;
        document.getElementById('date').value = task.date;
        document.getElementById('description').value = task.description;

        // Delete the task from the array
        tasks.splice(index, 1);
        displayTasks();
        overlay.style.display = 'flex'; // Show the overlay for editing
    };
});

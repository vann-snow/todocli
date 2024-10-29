document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const progressSquares = document.querySelectorAll('.progress-square');
    const completionText = document.querySelector('.completion-text');
    
    // Load tasks from localStorage
    loadTasks();
    updateProgress();
    
    // Add form submit handler
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text) {
            addTask(text);
        }
    });
    
    function addTask(text) {
        const tasks = getTasks();
        const newTask = {
            id: Date.now(),
            text: text.toUpperCase(),
            completed: false
        };
        
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        // Immediately display the new task
        displayTask(newTask);
        
        // Clear the input field
        taskInput.value = '';
        
        // Update the progress bar
        updateProgress();
    }
    
    function displayTask(task) {
        const span = document.createElement('span');
        span.className = 'task-item';
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add('completed');
        }
        
        // Add click event to toggle completion
        span.addEventListener('click', () => toggleTask(task.id, span));
        
        taskList.appendChild(span);
    }
    
    function toggleTask(id, element) {
        const tasks = getTasks();
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            if (task.completed) {
                element.classList.add('completed');
            } else {
                element.classList.remove('completed');
                element.style.opacity = '1';
            }
            
            updateProgress();
        }
    }
    
    function updateProgress() {
        const tasks = getTasks();
        if (tasks.length === 0) {
            setProgress(100); // Show 100% when no tasks
            return;
        }
        
        const completedTasks = tasks.filter(task => task.completed).length;
        const percentage = Math.round((completedTasks / tasks.length) * 100);
        setProgress(percentage);

        // If all tasks are completed (100%)
        if (percentage === 100) {
            // Remove completed tasks from localStorage
            const updatedTasks = tasks.filter(task => !task.completed);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            // Fade out and remove completed tasks from DOM
            document.querySelectorAll('.task-item.completed').forEach(element => {
                setTimeout(() => {
                    element.style.opacity = '0';
                    setTimeout(() => element.remove(), 500);
                }, 500);
            });
        }
    }
    
    function setProgress(percentage) {
        completionText.textContent = `${percentage}% COMPLETE`;
        const activeSquares = Math.round((percentage / 100) * 10);
        
        progressSquares.forEach((square, index) => {
            square.style.opacity = index < activeSquares ? '1' : '0.2';
        });
    }
    
    function loadTasks() {
        const tasks = getTasks();
        tasks.forEach(task => displayTask(task));
    }
    
    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }
});

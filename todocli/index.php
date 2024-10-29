<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo CLI</title>
    <meta name="description" content="Your todo line interface"/>
    <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16"/>
    <link rel="apple-touch-icon" href="/apple-icon.png" type="image/png" sizes="180x180"/>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container ">
        <div class="progress-bar">
            <?php for($i = 0; $i < 10; $i++): ?>
                <div class="progress-square"></div>
            <?php endfor; ?>
        </div>
        <div class="completion-text">0% COMPLETE</div>
        
        <form id="taskForm">
            <input type="text" id="taskInput" placeholder="ADD TASK" required>
        </form>

        <div id="taskList">
            <!-- Tasks will be dynamically added here -->
        </div>
    </div>

    <script src="js/app.js"></script>
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('service-worker.js')
                    .then(reg => console.log('Service Worker registered'))
                    .catch(err => console.log('Service Worker not registered', err));
            });
        }
    </script>
</body>
</html>

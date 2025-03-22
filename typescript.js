<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flappy Bird Game</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #70c5ce;
        }
        .game-container {
            border: 2px solid #333;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <canvas id="gameCanvas" width="400" height="600"></canvas>
    </div>
    <script>
        // TypeScript code compiled to JavaScript
        var canvas = document.getElementById('gameCanvas');
        var ctx = canvas.getContext('2d');

        // Load images
        var birdImg = new Image();
        var bgImg = new Image();
        var fgImg = new Image();
        var pipeNorthImg = new Image();
        var pipeSouthImg = new Image();

        birdImg.src = 'bird.png'; // Place this image in the same directory as the HTML file
        bgImg.src = 'bg.png'; // Place this image in the same directory as the HTML file
        fgImg.src = 'fg.png'; // Place this image in the same directory as the HTML file
        pipeNorthImg.src = 'pipeNorth.png'; // Place this image in the same directory as the HTML file
        pipeSouthImg.src = 'pipeSouth.png'; // Place this image in the same directory as the HTML file

        // Game variables
        var gap = 85;
        var constant;
        var bX = 10;
        var bY = 150;
        var gravity = 1.5;
        var score = 0;

        // Audio files
        var fly = new Audio();
        var scor = new Audio();

        fly.src = 'fly.mp3'; // Place this audio file in the same directory as the HTML file
        scor.src = 'score.mp3'; // Place this audio file in the same directory as the HTML file

        // On key down
        document.addEventListener('keydown', moveUp);

        function moveUp() {
            bY -= 25;
            fly.play();
        }

        // Pipe coordinates
        var pipe = [];

        pipe[0] = {
            x: canvas.width,
            y: 0
        };

        // Draw images
        function draw() {
            ctx.drawImage(bgImg, 0, 0);

            for (var i = 0; i < pipe.length; i++) {
                constant = pipeNorthImg.height + gap;
                ctx.drawImage(pipeNorthImg, pipe[i].x, pipe[i].y);
                ctx.drawImage(pipeSouthImg, pipe[i].x, pipe[i].y + constant);

                pipe[i].x--;

                if (pipe[i].x === 125) {
                    pipe.push({
                        x: canvas.width,
                        y: Math.floor(Math.random() * pipeNorthImg.height) - pipeNorthImg.height
                    });
                }

                // Detect collision
                if (bX + birdImg.width >= pipe[i].x && bX <= pipe[i].x + pipeNorthImg.width && (bY <= pipe[i].y + pipeNorthImg.height || bY + birdImg.height >= pipe[i].y + constant) || bY + birdImg.height >= canvas.height - fgImg.height) {
                    location.reload(); // Reload the page
                }

                if (pipe[i].x === 5) {
                    score++;
                    scor.play();
                }
            }

            ctx.drawImage(fgImg, 0, canvas.height - fgImg.height);
            ctx.drawImage(birdImg, bX, bY);

            bY += gravity;

            ctx.fillStyle = '#000';
            ctx.font = '20px Verdana';
            ctx.fillText('Score : ' + score, 10, canvas.height - 20);

            requestAnimationFrame(draw);
        }

        // Ensure images are loaded before starting the game
        function startGame() {
            if (birdImg.complete && bgImg.complete && fgImg.complete && pipeNorthImg.complete && pipeSouthImg.complete) {
                draw();
            } else {
                setTimeout(startGame, 100);
            }
        }

        startGame();
    </script>
</body>
</html>

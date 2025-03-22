const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Load images
const birdImg = new Image();
const bgImg = new Image();
const fgImg = new Image();
const pipeNorthImg = new Image();
const pipeSouthImg = new Image();

birdImg.src = 'https://example.com/bird.png'; // Replace with the actual URL of the bird image
bgImg.src = 'https://example.com/bg.png'; // Replace with the actual URL of the background image
fgImg.src = 'https://example.com/fg.png'; // Replace with the actual URL of the foreground image
pipeNorthImg.src = 'https://example.com/pipeNorth.png'; // Replace with the actual URL of the north pipe image
pipeSouthImg.src = 'https://example.com/pipeSouth.png'; // Replace with the actual URL of the south pipe image

// Game variables
let gap = 85;
let constant: number;

let bX = 10;
let bY = 150;

let gravity = 1.5;

let score = 0;

// Audio files
const fly = new Audio();
const scor = new Audio();

fly.src = 'https://example.com/fly.mp3'; // Replace with the actual URL of the fly sound
scor.src = 'https://example.com/score.mp3'; // Replace with the actual URL of the score sound

// On key down
document.addEventListener('keydown', moveUp);

function moveUp() {
    bY -= 25;
    fly.play();
}

// Pipe coordinates
interface Pipe {
    x: number;
    y: number;
}

let pipe: Pipe[] = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

// Draw images
function draw() {
    ctx.drawImage(bgImg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
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

draw();

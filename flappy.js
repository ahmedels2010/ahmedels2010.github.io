const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let bird = { x: 50, y: 200, width: 20, height: 20, gravity: 0.6, lift: -10, velocity: 0 };
let pipes = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", e => {
  if (e.code === "Space") {
    bird.velocity = bird.lift;
    if (gameOver) location.reload();
  }
});

function spawnPipe() {
  const gap = 140;
  const top = Math.random() * 250 + 50;
  pipes.push({ x: 400, top: top - gap, bottom: top + gap, width: 40 });
}

setInterval(spawnPipe, 1500);

function update() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > 600 || bird.y < 0) {
    gameOver = true;
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].x -= 3;

    // Collision
    if (
      bird.x < pipes[i].x + pipes[i].width &&
      bird.x + bird.width > pipes[i].x &&
      (bird.y < pipes[i].top || bird.y + bird.height > pipes[i].bottom)
    ) {
      gameOver = true;
    }

    if (pipes[i].x + pipes[i].width < 0) {
      pipes.splice(i, 1);
      score++;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  // Pipes
  ctx.fillStyle = "green";
  for (const p of pipes) {
    ctx.fillRect(p.x, 0, p.width, p.top);
    ctx.fillRect(p.x, p.bottom, p.width, canvas.height);
  }

  // Score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.fillText("GAME OVER", 100, 300);
    ctx.font = "20px Arial";
    ctx.fillText("Premi SPAZIO per riprovare", 100, 340);
  }
}

function gameLoop() {
  if (!gameOver) update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
 
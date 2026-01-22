class Particle {
    constructor(x, y, vx, vy, radius, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
    }
    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }

}

const containerWidth = window.innerWidth;
const containerHeight = window.innerHeight;

const lastTime = performance.now();
const p = new Particle(50, 50, 1, 1, 5, 'red');
p.update(16);
console.log(p.x, p.y);
let ball = document.createElement('div');
ball.style.backgroundColor = p.color;
ball.style.width = p.radius * 2 + 'px';
ball.style.height = p.radius * 2 + 'px';
ball.style.left = p.x + 'px';
ball.style.top = p.y + 'px';
ball.style.position = 'absolute';

document.body.appendChild(ball);

function handleCollision(p) {
    if (p.x - p.radius < 0 || p.x + p.radius > containerWidth) {
        p.vx = -p.vx;
    }
    if (p.y - p.radius < 0 || p.y + p.radius > containerHeight) {
        p.vy = -p.vy;
    }
}

function loop(currentTime) {
    const dt = currentTime - lastTime;
    p.update(dt / 1000);
    ball.style.transform = `translate(${p.x - p.radius}px, ${p.y - p.radius}px)`;
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
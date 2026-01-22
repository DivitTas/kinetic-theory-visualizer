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

let lastTime = performance.now();
const p = new Particle(50, 50, 200, 150, 5, 'red');

const ball = document.createElement('div');
ball.style.position = 'absolute';
ball.style.width = p.radius * 2 + 'px';
ball.style.height = p.radius * 2 + 'px';
ball.style.backgroundColor = p.color;
document.body.appendChild(ball);

function handleCollision(p) {
    if (p.x - p.radius < 0 && p.vx < 0) {
        p.x = p.radius;
        p.vx *= -1;
    }
    if (p.x + p.radius > containerWidth && p.vx > 0) {
        p.x = containerWidth - p.radius;
        p.vx *= -1;
    }
    if (p.y - p.radius < 0 && p.vy < 0) {
        p.y = p.radius;
        p.vy *= -1;
    }
    if (p.y + p.radius > containerHeight && p.vy > 0) {
        p.y = containerHeight - p.radius;
        p.vy *= -1;
    }
}

function loop(time) {
    let dt = (time - lastTime) / 1000;
    lastTime = time;
    p.update(dt);
    handleCollision(p);
    ball.style.transform =`translate(${p.x - p.radius}px, ${p.y - p.radius}px)`;
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
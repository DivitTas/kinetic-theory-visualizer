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


function loop(currentTime) {
    const dt = currentTime - lastTime;
    p.update(dt / 1000);
    ball.style.transform = `translate(${p.x}px, ${p.y}px)`;
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
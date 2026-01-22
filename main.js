class Particle {
    constructor(x, y, vx, vy, radius, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;

        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.style.width = this.radius * 2 + 'px';
        this.el.style.height = this.radius * 2 + 'px';
        this.el.style.backgroundColor = this.color;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }
}  
//create a container
const container = document.createElement('div');
container.style.position = 'relative';
container.style.width = '600px';
container.style.height = '400px';
container.style.border = '2px solid black';
container.style.margin = '50px';
container.style.background = 'lightpink';

document.body.appendChild(container);

//create a particle
const p = new Particle(50, 50, 200, 150, 5, 'red');
container.appendChild(p.el);


const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;


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

let lastTime = null;    
function loop(time) {
    if (lastTime === null) {
        lastTime = time;
        requestAnimationFrame(loop);
        return;
    }

    const dt = (time - lastTime) / 1000;
    lastTime = time;
    console.log(dt);
    p.update(dt);
    handleCollision(p);
    p.el.style.left = (p.x - p.radius) + 'px';
    p.el.style.top = (p.y - p.radius) + 'px';
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
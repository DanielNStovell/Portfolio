const numParticles = 100;
const particles = [];

const mouseMaxDistance = 200; // Distance until particles will interact with the mouse
const maxParticleSize = 5;
const minParticleSize = 5;

const lineMaxDistance = 200; // Distance until lines will form between particles
const maxLineOpacity = 180;
const minLineOpacity = 0;

let particleColour;

function setup() {
  particleColour = color(58, 57, 64);

  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("display", "block");
  cnv.style("position", "absolute");
  cnv.style("inset", 0);
  cnv.style("z-index", -1);

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(255);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.update();
    p.drawParticle();

    for (let j = i + 1; j < particles.length; j++) {
      p.drawLine(particles[j]);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor(x = random(width), y = random(height)) {
    this.x = x;
    this.y = y;

    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
  }

  update() {
    this.mouseInteraction();

    this.x += this.vx;
    this.y += this.vy;

    this.edgeBounce();
  }

  mouseInteraction() {
    if (!mouseIsPressed) return;

    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distSq = dx * dx + dy * dy;
    const maxSq = mouseMaxDistance * mouseMaxDistance;

    if (distSq < maxSq) {
      const mag = Math.sqrt(distSq) || 1;
      const fx = (dx / mag) * 0.5;
      const fy = (dy / mag) * 0.5;

      this.vx += fx;
      this.vy += fy;

      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > 3) {
        this.vx = (this.vx / speed) * 3;
        this.vy = (this.vy / speed) * 3;
      }
    }
  }

  edgeBounce() {
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  drawLine(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distSq = dx * dx + dy * dy;
    const maxSq = lineMaxDistance * lineMaxDistance;

    if (distSq < maxSq) {
      const alpha = map(distSq, 0, maxSq, maxLineOpacity, minLineOpacity);
      stroke(
        red(particleColour),
        green(particleColour),
        blue(particleColour),
        alpha
      );
      strokeWeight(1);
      line(this.x, this.y, other.x, other.y);
    }
  }

  drawParticle() {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distSq = dx * dx + dy * dy;
    const maxSq = mouseMaxDistance * mouseMaxDistance;

    let size = map(distSq, 0, maxSq, maxParticleSize, minParticleSize);
    size = constrain(size, minParticleSize, maxParticleSize);

    noStroke();
    fill(particleColour);
    ellipse(this.x, this.y, size);
  }
}
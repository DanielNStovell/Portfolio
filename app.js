const numParticles = 100;
const particles = [];

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("display", "block");
  cnv.style("position", "absolute");
  cnv.style("inset", 0);
  // cnv.style("z-index", -1);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle())
  }
}

/*
function mouseClicked() {
  particles.push(new Particle(mouseX, mouseY));
  console.log("Mouse Clicked")
}
*/

function draw() {
  background('#1F1F1F');

  particles.forEach((particle, index) => {
    particle.update();
    particle.drawParticle();
    particle.drawLines(particles.slice(index))
  })
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

class Particle {
  constructor(x=random(0, windowWidth), y=random(0, windowHeight)) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2,2), random(-2, 2))
    this.acceleration = createVector();
  }

  update() {
    this.detectMouseInteraction()
    this.position.add(this.velocity);
    this.detectEdges();
  }

  detectMouseInteraction() {
    if (mouseIsPressed) {
      let mouse = createVector(mouseX, mouseY)
      let direction = mouse.sub(this.position);
      let distance = direction.mag();

      const mouseMaxDistance = 200;

      if (distance < mouseMaxDistance) {
        direction.normalize();
        direction.mult(0.5);
        this.acceleration = direction;
        this.velocity.add(this.acceleration)
        this.velocity.limit(4)
      }
    }
  }

  detectEdges() {

    if (this.position.x < 0 || this.position.x > windowWidth) {
      this.velocity.x *= -1
    }
    if (this.position.y < 0 || this.position.y > windowHeight) {
      this.velocity.y *= -1
    }
  }

  drawLines(particles) {
    particles.forEach(particle => {
      let distance = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);

      const lineMaxDistance = 200;

      if (distance < lineMaxDistance) {
        let alpha = map(distance, 0, lineMaxDistance, 255, 0)
        stroke(255, alpha);
        line(this.position.x, this.position.y, particle.position.x, particle.position.y)
      }
    })

  }

  drawParticle() {
    fill(255)
    noStroke();
    ellipse(this.position.x, this.position.y, 5)
  }
}
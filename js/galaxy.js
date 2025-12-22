/**
 * Galaxy Background Animation
 * Uses Canvas for a high-performance particle system
 */

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.initialize();
  }

  initialize() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.width; // Use width to allow movement range
    this.size = Math.random() * 2 + 0.1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    
    // Randomly assign colors (purple, blue, pink, white)
    const colors = [
      'rgba(138, 43, 226, 0.6)', // neon purple
      'rgba(0, 212, 255, 0.6)',   // neon blue
      'rgba(255, 0, 255, 0.6)',   // neon pink
      'rgba(255, 255, 255, 0.4)'  // white stars
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = Math.random();
    this.fadeSpeed = Math.random() * 0.02 + 0.005;
    this.fadingIn = true;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Pulse effect
    if (this.fadingIn) {
      this.opacity += this.fadeSpeed;
      if (this.opacity >= 0.8) this.fadingIn = false;
    } else {
      this.opacity -= this.fadeSpeed;
      if (this.opacity <= 0.1) this.fadingIn = true;
    }

    // Wrap around screen
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color.replace('0.6', this.opacity.toFixed(2));
    this.ctx.fill();
    
    // Add glow for larger particles
    if (this.size > 1.5) {
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = this.color;
    } else {
      this.ctx.shadowBlur = 0;
    }
  }
}

class Galaxy {
  constructor() {
    this.canvas = document.getElementById('galaxy-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = window.innerWidth < 768 ? 100 : 250;
    
    this.resize();
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Reset particles on significant resize
    if (this.particles.length > 0) {
      this.particleCount = window.innerWidth < 768 ? 100 : 250;
      this.init();
    }
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.canvas));
    }
  }

  animate() {
    // Slight clear with opacity to create trail effect if desired
    // For stars, we usually want a clean clear
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize galaxy when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Galaxy();
});

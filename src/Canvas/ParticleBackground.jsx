import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const mouse = { x: null, y: null, radius: 100 };

    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor(x, y, dx, dy, size) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
      }

      draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
          if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
            this.x += 3;
          }
          if (mouse.x > this.x && this.x > this.size * 10) {
            this.x -= 3;
          }
          if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
            this.y += 3;
          }
          if (mouse.y > this.y && this.y > this.size * 10) {
            this.y -= 3;
          }
        }
        this.draw();
      }
    }

    let particlesArray = [];
    const initParticles = () => {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const dx = (Math.random() - 0.5) * 1;
        const dy = (Math.random() - 0.5) * 1;
        particlesArray.push(new Particle(x, y, dx, dy, size));
      }
    };

    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = dx * dx + dy * dy;
          const maxDistance = (canvas.width / 7) * (canvas.height / 7);
          if (distance < maxDistance) {
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle) => particle.update());
      connectParticles();
    };

    initParticles();
    animate();

    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1, 
        background: '#000'
      }}
    ></canvas>
  );
};

export default ParticleBackground;

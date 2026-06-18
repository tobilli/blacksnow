import { useEffect, useRef } from 'react';
import './Background.scss';

const snowflakes = Array.from({ length: 60 }, (_, index) => index);

const getSnowColor = () => {
  const shade = Math.random() < 0.4 ? 255 : 180 + Math.floor(Math.random() * 60);
  const alpha = 0.35 + Math.random() * 0.45;
  return `rgba(${shade}, ${shade}, ${shade}, ${alpha})`;
};

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let mx = 0;
    let my = 0;
    let particles: Particle[] = [];
    let animationFrame = 0;

    class Particle {
      x = 0;
      y = 0;
      r = 0;
      vx = 0;
      vy = 0;
      alpha = 0;
      wobble = 0;
      wobbleSpeed = 0;
      type: 'snow' | 'mote' = 'snow';

      constructor() {
        this.type = Math.random() < 0.7 ? 'snow' : 'mote';
        this.spawn();
      }

      spawn() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        if (this.type === 'snow') {
          this.r = Math.random() * 1.6 + 0.5;
          this.vy = Math.random() * 1.2 + 0.6;
          this.vx = (Math.random() - 0.5) * 0.8;
          this.alpha = Math.random() * 0.35 + 0.25;
          this.wobble = Math.random() * Math.PI * 2;
          this.wobbleSpeed = Math.random() * 0.02 + 0.005;
        } else {
          this.r = Math.random() * 3 + 1.5;
          this.vy = Math.random() * 0.4 + 0.1;
          this.vx = (Math.random() - 0.5) * 0.25;
          this.alpha = Math.random() * 0.12 + 0.06;
          this.wobble = 0;
          this.wobbleSpeed = 0;
        }
      }

      update() {
        this.wobble += this.wobbleSpeed;
        this.x += this.vx + Math.sin(this.wobble) * 0.3 + mx * 2.5;
        this.y += this.vy;
        if (this.y > H + 20) {
          this.x = Math.random() * W;
          this.y = -10;
        }
        if (this.x > W + 20) this.x = -20;
        if (this.x < -20) this.x = W + 20;
      }

      draw() {
        ctx.globalAlpha = this.alpha;
        const shade = Math.random() < 0.4 ? 255 : 180 + Math.floor(Math.random() * 60);
        ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resize = () => {
      W = canvas.width = root.offsetWidth;
      H = canvas.height = root.offsetHeight;
    };

    const render = () => {
      if (!ctx) return;
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, W, H);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrame = requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      mx = (event.clientX - rect.left) / W - 0.5;
      my = (event.clientY - rect.top) / H - 0.5;
    };

    resize();
    particles = Array.from({ length: 180 }, () => new Particle());
    window.addEventListener('resize', resize);
    root.addEventListener('mousemove', handleMouseMove);
    render();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      root.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="background-root" ref={rootRef}>
      <canvas ref={canvasRef} className="background-canvas" />
      <div className="atmo atmo-vignette" />
      <div className="atmo atmo-lines" />
      <svg
        className="diag-svg"
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="470" x2="280" y2="520" stroke="#c8c3bb" strokeWidth="0.5" opacity="0.6" />
        <line x1="1200" y1="0" x2="1440" y2="40" stroke="#c8c3bb" strokeWidth="0.5" opacity="0.6" />
      </svg>
      <div className="snow-container">
        {snowflakes.map((snowflake) => (
          <div
            key={snowflake}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
              opacity: 0.2 + Math.random() * 0.45,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: getSnowColor(),
              boxShadow: `0 0 ${Math.random() * 4 + 2}px rgba(0, 0, 0, 0.18)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Background;

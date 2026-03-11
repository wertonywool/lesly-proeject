
/**
 * main.js - Motor de Efectos Ambientales de Alta Calidad
 * Inspirado en la estética cinemática de Genshin Impact
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. MANEJO DEL LOADER (Elegante)
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.filter = 'blur(20px)';
                loader.style.opacity = '0';
                setTimeout(() => loader.classList.add('hidden'), 800);
            }, 1200);
        });
    }

    // 2. CONFIGURACIÓN DEL MOTOR DE PARTÍCULAS
    const canvas = document.createElement('canvas');
    canvas.id = 'ambient-fx';
    Object.assign(canvas.style, {
        position: 'fixed',
        inset: '0',
        pointerEvents: 'none',
        zIndex: '1' // Detrás del contenido pero sobre el fondo
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const isSakura = document.body.classList.contains('sakura-theme');

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    resize();

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = isSakura ? -20 : canvas.height + 20;
            this.size = isSakura ? (Math.random() * 12 + 8) : (Math.random() * 3 + 1);
            this.baseSpeedY = isSakura ? (Math.random() * 1 + 0.5) : -(Math.random() * 0.8 + 0.3);
            this.speedY = this.baseSpeedY;
            this.speedX = Math.random() * 1.5 - 0.75;
            this.angle = Math.random() * Math.PI * 2;
            this.spin = Math.random() * 0.05 - 0.025;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.flicker = Math.random() * 0.05;
            
            // Atributos de balanceo (Sway)
            this.sway = Math.random() * 2;
            this.swaySpeed = Math.random() * 0.02 + 0.01;
        }

        update() {
            // Movimiento básico
            this.sway += this.swaySpeed;
            this.x += this.speedX + Math.sin(this.sway) * 0.5;
            this.y += this.speedY;
            this.angle += this.spin;

            // Interacción con el mouse
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const dirX = dx / distance;
                const dirY = dy / distance;
                this.x -= dirX * force * 5;
                this.y -= dirY * force * 5;
            }

            // Reposicionar si sale de pantalla
            if (isSakura) {
                if (this.y > canvas.height + 20) this.init();
            } else {
                if (this.y < -20) this.init();
            }
            if (this.x > canvas.width + 20 || this.x < -20) this.x = Math.random() * canvas.width;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.globalAlpha = this.opacity;

            if (isSakura) {
                // Dibujar pétalo de Sakura estilizado
                ctx.fillStyle = '#ffb7c5';
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(this.size, -this.size, this.size, this.size, 0, this.size);
                ctx.bezierCurveTo(-this.size, this.size, -this.size, -this.size, 0, 0);
                ctx.fill();
                
                // Brillo suave
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(255, 183, 197, 0.5)';
            } else {
                // Dibujar brasa ardiente (Arlecchino style)
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
                grad.addColorStop(0, '#fff');
                grad.addColorStop(0.4, '#ff4d4d');
                grad.addColorStop(1, 'transparent');
                
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2);
                ctx.fill();

                // Efecto de parpadeo
                this.opacity += (Math.random() - 0.5) * 0.1;
                this.opacity = Math.max(0.2, Math.min(0.8, this.opacity));
            }

            ctx.restore();
        }
    }

    // Inicializar partículas con densidad optimizada
    const count = isSakura ? 40 : 70;
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Efecto de iluminación ambiental siguiendo al mouse
        if (mouse.x > 0) {
            const radialGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius * 2);
            radialGrad.addColorStop(0, isSakura ? 'rgba(255, 183, 197, 0.05)' : 'rgba(255, 26, 26, 0.05)');
            radialGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = radialGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    };

    animate();
});

// Función Global para el efecto de Globos
window.createBalloons = function() {
    const colors = ['🎈', '✨', '💖', '🎊', '🎁'];
    const container = document.body;
    
    for (let i = 0; i < 30; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.innerText = colors[Math.floor(Math.random() * colors.length)];
        
        // Posición y retraso aleatorio
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.animationDelay = Math.random() * 2 + 's';
        balloon.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        
        container.appendChild(balloon);
        
        // Limpiar elemento después de la animación
        setTimeout(() => balloon.remove(), 6000);
    }
};

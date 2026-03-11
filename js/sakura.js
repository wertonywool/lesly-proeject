
function initSakura() {
    const petalsContainer = document.getElementById('sakura-overlay');
    if (!petalsContainer) {
        const overlay = document.createElement('div');
        overlay.id = 'sakura-overlay';
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '10';
        document.body.appendChild(overlay);
    }

    const container = document.getElementById('sakura-overlay');

    function createPetal() {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Posición inicial
        petal.style.left = Math.random() * 100 + 'vw';
        
        // Tamaño
        const size = (Math.random() * 10 + 10) + 'px';
        petal.style.width = size;
        petal.style.height = size;
        
        // Emoji
        petal.innerText = '🌸';
        petal.style.fontSize = size;
        
        // Animación personalizada
        const duration = Math.random() * 3000 + 5000;
        const drift = Math.random() * 200 - 100;

        petal.animate([
            { transform: 'translateY(-20px) rotate(0deg) translateX(0)', opacity: 0 },
            { opacity: 1, offset: 0.1 },
            { transform: `translateY(110vh) rotate(720deg) translateX(${drift}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'linear'
        });

        container.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, duration);
    }

    setInterval(createPetal, 400);
}

document.addEventListener('DOMContentLoaded', initSakura);

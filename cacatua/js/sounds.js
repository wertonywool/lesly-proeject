
const SFX = {
    click: 'https://files.catbox.moe/ab98v9.mp3', // Click de menú de Genshin
    wish4: 'https://files.catbox.moe/19p4at.mp3', // Sonido 4 estrellas
    wish5: 'https://files.catbox.moe/m7q522.mp3', // Sonido 5 estrellas (legendario)
    alert: 'https://files.catbox.moe/9x8p5v.mp3', // Sonido de aviso/intervención
    transition: 'https://files.catbox.moe/3e8u6a.mp3' // Transición de página
};

// Rutas de música local
const BGM_PATHS = {
    index: 'index.ogg',
    inazuma: 'inazuma.ogg'
};

let currentBGM = null;

const SoundManager = {
    play: function(key) {
        const audio = new Audio(SFX[key]);
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Interacción requerida para SFX"));
    },
    
    playBGM: function(path) {
        if (currentBGM) {
            currentBGM.pause();
            currentBGM = null;
        }
        
        currentBGM = new Audio(path);
        currentBGM.loop = true;
        currentBGM.volume = 0.4;
        
        const startPlay = () => {
            currentBGM.play().catch(e => console.log("Esperando click para música..."));
        };

        // El navegador bloquea el audio hasta que el usuario interactúa
        startPlay();
        document.addEventListener('click', startPlay, { once: true });
    },

    stopBGM: function() {
        if (currentBGM) {
            currentBGM.pause();
            currentBGM = null;
        }
    }
};

// LÓGICA DE AUTO-REPRODUCCIÓN SEGÚN LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isIndex = path.endsWith('index.html') || path === '/' || path.endsWith('cacatua/');
    const isGacha = path.includes('gacha.html');

    // Determinar qué música poner
    if (isIndex) {
        SoundManager.playBGM(BGM_PATHS.index);
    } else if (!isGacha) {
        // Para todas las demás páginas (lesly, mailbox, game, etc.)
        // Si estamos en una subcarpeta (pages/), la ruta es ../inazuma.mp3
        const prefix = path.includes('/pages/') ? '../' : '';
        SoundManager.playBGM(prefix + BGM_PATHS.inazuma);
    }
});

// Auto-asignar sonidos de click a botones y enlaces
document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('a')) {
        SoundManager.play('click');
    }
});

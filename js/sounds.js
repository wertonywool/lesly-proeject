
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
    
    playBGM: function(relativePath) {
        // Convertir ruta relativa a absoluta para comparaciones precisas
        const absolutePath = new URL(relativePath, window.location.href).href;

        // Si ya está sonando la misma canción (comparando URLs absolutas), no hacemos nada
        if (currentBGM && currentBGM.src === absolutePath) return;

        if (currentBGM) {
            currentBGM.pause();
        }
        
        currentBGM = new Audio(absolutePath);
        currentBGM.loop = true;
        currentBGM.volume = 0.4;
        
        // RECUPERAR PROGRESO: Usamos el nombre del archivo como clave para que sea consistente
        const fileName = relativePath.split('/').pop();
        const savedTime = localStorage.getItem('bgm_time_' + fileName);
        
        if (savedTime) {
            currentBGM.currentTime = parseFloat(savedTime);
        }

        // GUARDAR PROGRESO: Actualizar localStorage frecuentemente
        currentBGM.ontimeupdate = () => {
            localStorage.setItem('bgm_time_' + fileName, currentBGM.currentTime);
            localStorage.setItem('bgm_current_file', fileName);
        };

        const startPlay = () => {
            currentBGM.play().catch(e => console.log("Esperando click para música..."));
        };

        // Intentar reproducir automáticamente
        startPlay();
        // Fallback por bloqueo de navegador
        document.addEventListener('click', startPlay, { once: true });
    },

    stopBGM: function() {
        if (currentBGM) {
            const fileName = currentBGM.src.split('/').pop();
            localStorage.removeItem('bgm_time_' + fileName);
            currentBGM.pause();
            currentBGM = null;
        }
    }
};

// Guardar progreso justo antes de salir de la página (más fiable)
window.addEventListener('beforeunload', () => {
    if (currentBGM) {
        const fileName = currentBGM.src.split('/').pop();
        localStorage.setItem('bgm_time_' + fileName, currentBGM.currentTime);
    }
});

// LÓGICA DE AUTO-REPRODUCCIÓN SEGÚN LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isIndex = path.endsWith('index.html') || path === '/' || path.endsWith('cacatua/');
    const isGacha = path.includes('gacha.html');

    if (isIndex) {
        SoundManager.playBGM(BGM_PATHS.index);
    } else if (isGacha) {
        // En el Gacha detenemos la música para que se oiga el video/sfx
        SoundManager.stopBGM();
    } else {
        // Para todas las demás páginas
        const prefix = path.includes('/pages/') ? '../' : '';
        SoundManager.playBGM(prefix + BGM_PATHS.inazuma);
    }
});

// Auto-asignar sonidos de click
document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('a')) {
        SoundManager.play('click');
    }
});

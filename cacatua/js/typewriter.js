
function typeWriter(elementId, text, speed = 50) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const storyText = document.getElementById('story-text');
    if (storyText) {
        const text = "Érase una vez, en un rincón especial del mundo, nació una leyenda. No era una leyenda de dragones o espadas, sino una de alegría y sonrisas. Lesly, hoy celebramos que esa leyenda sigue creciendo. Que cada capítulo de tu vida sea más brillante que el anterior.";
        typeWriter('story-text', text);
    }
});

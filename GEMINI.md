# 🎂 Proyecto: Cacatua - Cumpleaños de Lesly ✨

Este proyecto es una experiencia web inmersiva y festiva diseñada como un regalo de cumpleaños personalizado para **Lesly**. Fusiona la elegancia estética de **Genshin Impact** (estilos de Natlan y Arlecchino) con un tono alegre, cálido y lleno de vida.

---

## 🌟 Información General
- **Propósito**: Celebración interactiva del cumpleaños de Lesly (**12 de Marzo**).
- **Temática**: Genshin Impact UI/UX con elementos festivos (emojis, animaciones fluidas).
- **Estado**: Refactorizado con arquitectura modular y motor de efectos de alta calidad.

---

## 🎨 Identidad Visual y Estética
- **Paleta de Colores**:
  - `Carmesí (#ff1a1a)`: Energía y pasión (Arlecchino).
  - `Sakura (#ffb7c5)`: Dulzura y festividad.
  - `Oro (#c6a15b)`: Elegancia y rareza de 5 estrellas.
  - `Carbón (#050505)`: Fondo profundo para contraste premium.
- **Tipografía**:
  - `Cinzel`: Para títulos épicos y headers.
  - `Outfit`: Para lectura clara y moderna.
  - `Dancing Script`: Para toques personales y nombres resaltados.
- **Interactividad**:
  - Cursores personalizados de Genshin Impact en todo el sitio.
  - Sonidos de interfaz (SFX) originales de Genshin Impact.

---

## 🏗️ Arquitectura del Proyecto

### 📁 CSS (Estilos Modulares)
- `css/global.css`: Variables maestras, reset, cursores y utilidades globales.
- `css/components.css`: Elementos reutilizables (Header Universal, Botones Redondeados, Divisores, Esquinas).
- `css/animations.css`: Keyframes para efectos de flotado, brillo y transiciones.
- `css/pages/`: Estilos específicos para cada sección (`index.css`, `lesly.css`, `gacha.css`, `mailbox.css`, etc.).

### 📁 JS (Motores de Lógica)
- `js/main.js`: **Motor Ambiental de Alta Calidad**. Gestiona partículas en Canvas (Sakura/Cenizas) con física de viento e interacción con el mouse, además del cargador (Loader).
- `js/sounds.js`: Gestor de SFX global. Asigna automáticamente sonidos de click a botones y enlaces.
- `js/typewriter.js`: Efecto de escritura para narrativa y diálogos.

---

## 📂 Estructura de Archivos Principal

- `index.html`: Bienvenida festiva. Activa la secuencia de "Invocación de Regalo".
- `lesly.html`: Panel central (Archivo). Acceso a todas las funciones tras el Gacha.
- `pages/gacha.html`: Secuencia cinemática de deseo (corre a pantalla completa).
- `pages/mailbox.html`: Buzón de mensajes con cartas personalizadas y recompensas.
- `pages/game.html`: Minijuego interactivo "Desafío del Chef Sushi".
- `pages/story.html`: Sección narrativa con diálogos automáticos.
- `pages/redeem.html`: Sistema de canje de códigos promocionales.

---

## ⚙️ Mecánicas Core

1. **Header Universal**: Presente en todas las páginas excepto Index y Gacha. Muestra "Cumpleaños de Lesly" y permite navegación rápida.
2. **Motor de Partículas Inteligente**: 
   - `class="sakura-theme"` en el `body`: Genera pétalos de sakura cayendo.
   - Sin clase temática: Genera brasas ardientes estilo Arlecchino.
3. **Inmersión de Audio**: El `SoundManager` en `sounds.js` centraliza los sonidos para evitar redundancia y manejar errores de carga.

---

## 📝 Notas para el Desarrollador
- **Imágenes**: Todos los recursos visuales deben mantener la transparencia (PNG) para no romper el fondo dinámico.
- **Navegación**: Al añadir nuevas páginas, asegúrate de incluir `global.css`, `components.css` y el script `main.js` para mantener la coherencia.
- **Fecha Crítica**: Cualquier lógica temporal debe apuntar al **12 de Marzo**.

---

## 🚀 Plan de Ruta (Roadmap)
- [ ] Implementar un contador (Countdown) que se bloquee hasta el inicio del día 12.
- [ ] Añadir más "mensajes de amigos" en el Buzón.
- [ ] Optimizar los videos para carga ultra-rápida en móviles.

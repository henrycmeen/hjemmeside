const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const sound = new Audio('click.mp3');

// Tilpass canvas til skjermstørrelsen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;
let path = [];

// Event listeners for drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Start drawing function
function startDrawing(e) {
    isDrawing = true;
    path = [];
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    sound.play();
}

// Draw function
function draw(e) {
    if (!isDrawing) return;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = '#275DEA';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
    path.push({ x: e.clientX, y: e.clientY });
}

// Stop drawing function
function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
    checkSelection();
}

// Funksjon for å sjekke om et prosjekt er ringet rundt
function checkSelection() {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        const rect = project.getBoundingClientRect();
        const projectX = rect.left;
        const projectY = rect.top;
        const projectW = rect.width;
        const projectH = rect.height;

        const inside = path.some(p =>
            p.x > projectX && p.x < projectX + projectW &&
            p.y > projectY && p.y < projectY + projectH
        );

        if (inside) {
            const link = project.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        }
    });
}

// Sørger for at canvas endrer størrelse med vinduet
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
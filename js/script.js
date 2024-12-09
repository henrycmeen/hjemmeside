const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const sound = new Audio('click.mp3');
canvas.addEventListener('mousedown', () => {
    sound.play();
});

// Resize the canvas to match the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;

// Event listeners for drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Start drawing
function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

// Draw on the canvas
function draw(e) {
    if (!isDrawing) return;
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = '#275DEA';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
}

// Stop drawing
function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}
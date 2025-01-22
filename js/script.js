// -------------------------------
// Grunnleggende oppsett
// -------------------------------

const svg = document.getElementById('drawingSvg');
const menuButton = document.getElementById('menuButton');
const menuPopup = document.getElementById('menuPopup');
const sendEmailButton = document.getElementById('sendEmail');
const restartDrawingButton = document.getElementById('restartDrawing');
const toggleDrawingButton = document.getElementById('toggleDrawing');

let isDrawing = false;
let drawingEnabled = true;
let pathData = [];
let currentPath;

// Skjul menyknappen ved start
menuButton.style.visibility = 'hidden';
menuButton.style.opacity = '0';

// -------------------------------
// Smiley-håndtering
// -------------------------------

const smileyIcons = ["(＾-＾)ノ", "(´• ω •`)", "o(^▽^)o", "(≧▽≦)"];
const smileyElement = document.getElementById('github-smiley');

function setRandomSmiley() {
    const randomIndex = Math.floor(Math.random() * smileyIcons.length);
    smileyElement.textContent = smileyIcons[randomIndex];
}
setRandomSmiley();

// -------------------------------
// Tegnefunksjoner
// -------------------------------

function startDrawing(e) {
    e.preventDefault();
    if (!drawingEnabled) return;

    isDrawing = true;
    pathData = [];

    const { x, y } = getEventPosition(e);
    pathData.push({ x, y });

    currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    currentPath.setAttribute("fill", "none");
    currentPath.setAttribute("stroke", "#275DEA");
    currentPath.setAttribute("stroke-width", "3");
    svg.appendChild(currentPath);

    // Vis menyknappen når tegning starter
    menuButton.style.visibility = 'visible';
    menuButton.style.opacity = '1';
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();

    const { x, y } = getEventPosition(e);
    pathData.push({ x, y });

    const d = pathData.map((point, index) =>
        index === 0 ? `M${point.x},${point.y}` : `L${point.x},${point.y}`
    ).join(" ");

    currentPath.setAttribute("d", d);
}

function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
}

// -------------------------------
// Menyfunksjonalitet
// -------------------------------

menuButton.addEventListener('click', () => {
    if (menuPopup.classList.contains('active')) {
        menuPopup.classList.remove('active');
    } else {
        menuPopup.classList.add('active');
    }
});

// Send tegning på e-post via meny
sendEmailButton.addEventListener('click', () => {
    const svgContent = new XMLSerializer().serializeToString(svg);
    const encodedSvg = encodeURIComponent(svgContent);
    const mailtoLink = `mailto:henrycmeen@me.com?subject=Tegning&body=Se vedlagt SVG:%0A${encodedSvg}`;
    window.location.href = mailtoLink;
    menuPopup.classList.remove('active');
});

// Start tegning på nytt via meny
restartDrawingButton.addEventListener('click', () => {
    svg.innerHTML = '<rect width="100%" height="100%" fill="transparent" />';
    menuPopup.classList.remove('active');
});

// Skru av/på tegning via meny
toggleDrawingButton.addEventListener('click', () => {
    drawingEnabled = !drawingEnabled;
    svg.style.pointerEvents = drawingEnabled ? "auto" : "none";

    toggleDrawingButton.innerHTML = drawingEnabled 
        ? '<span class="material-icons">block</span>' 
        : '<span class="material-icons">edit</span>';

    menuPopup.classList.remove('active');

    // Hvis tegning er skrudd av, skjul menyknappen
    if (!drawingEnabled) {
        menuButton.style.visibility = 'hidden';
        menuButton.style.opacity = '0';
    }
});

// -------------------------------
// Event-håndtering for tegning
// -------------------------------

svg.addEventListener('mousedown', startDrawing);
svg.addEventListener('mousemove', draw);
svg.addEventListener('mouseup', stopDrawing);
svg.addEventListener('mouseleave', stopDrawing);

svg.addEventListener('touchstart', startDrawing);
svg.addEventListener('touchmove', draw);
svg.addEventListener('touchend', stopDrawing);

// -------------------------------
// Hjelpefunksjoner
// -------------------------------

// Henter riktig posisjon for både touch og mus
function getEventPosition(e) {
    if (e.touches) {
        return {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    }
    return {
        x: e.clientX,
        y: e.clientY
    };
}

// Beregner alder basert på fødselsdato
function calculateAge(birthYear, birthMonth, birthDay) {
    const today = new Date();
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age;
}

// Oppdaterer alderen i HTML
const myAge = calculateAge(1992, 11, 3);
document.getElementById('age').textContent = myAge;
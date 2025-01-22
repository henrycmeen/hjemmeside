// -------------------------------
// Grunnleggende oppsett
// -------------------------------

const svg = document.getElementById('drawingSvg');
const emailBox = document.getElementById('emailBox');
let isDrawing = false;
let pathData = [];
let currentPath;

// -------------------------------
// Smiley-håndtering
// -------------------------------

// Liste med smilefjes som vises tilfeldig
const smileyIcons = [
    "(＾-＾)ノ",
    "(´• ω •`)",
    "o(^▽^)o",
    "(≧▽≦)"
];

// Henter smiley-elementet
const smileyElement = document.getElementById('github-smiley');

// Velger et tilfeldig smilefjes ved lasting av siden
function setRandomSmiley() {
    const randomIndex = Math.floor(Math.random() * smileyIcons.length);
    smileyElement.textContent = smileyIcons[randomIndex];
}

// Kjør funksjonen for å velge en smiley ved innlasting
setRandomSmiley();

// -------------------------------
// Tegnefunksjoner
// -------------------------------

// Viser e-postknappen når tegning starter
function showEmailBox() {
    emailBox.style.display = 'block';
}

// Start tegning
function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    pathData = [];
    showEmailBox();  // Viser knappen når tegning starter

    const { x, y } = getEventPosition(e);
    pathData.push({ x, y });

    currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    currentPath.setAttribute("fill", "none");
    currentPath.setAttribute("stroke", "#275DEA");
    currentPath.setAttribute("stroke-width", "3");
    currentPath.setAttribute("stroke-linecap", "round");
    currentPath.setAttribute("stroke-linejoin", "round");
    svg.appendChild(currentPath);
}

// Tegner linjer basert på bevegelse
function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();

    const { x, y } = getEventPosition(e);
    pathData.push({ x, y });

    const d = pathData.map((point, index) => {
        return index === 0 
            ? `M${point.x},${point.y}` 
            : `L${point.x},${point.y}`;
    }).join(" ");

    currentPath.setAttribute("d", d);
}

// Stopper tegning
function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
}

// -------------------------------
// Send tegning på e-post
// -------------------------------

// Klikkhåndtering for sendeknappen
document.getElementById('sendEmailButton').addEventListener('click', sendDrawing);

// Konverterer tegningen til SVG og åpner e-postklienten
function sendDrawing() {
    const svgContent = new XMLSerializer().serializeToString(svg);
    const encodedSvg = encodeURIComponent(svgContent);

    // Oppretter en e-postlenke med SVG-data
    const mailtoLink = `mailto:henrycmeen@me.com?subject=Tegning&body=Se vedlagt SVG:%0A${encodedSvg}`;

    // Åpner e-postklienten
    window.location.href = mailtoLink;

    // Skjuler knappen etter sending
    emailBox.style.display = 'none';
}

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
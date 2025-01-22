const svg = document.getElementById('drawingSvg');
const emailBox = document.getElementById('emailBox');
let isDrawing = false;
let pathData = [];
let currentPath;


// Liste over forskjellige smilefjes
const smileyIcons = [
    "(＾-＾)ノ",
    "(´• ω •`)",
    "o(^▽^)o",
    "(≧▽≦)"
];

// Hent smiley-elementet
const smileyElement = document.getElementById('github-smiley');

// Velg et tilfeldig smilefjes ved innlasting av siden
function setRandomSmiley() {
    const randomIndex = Math.floor(Math.random() * smileyIcons.length);
    smileyElement.textContent = smileyIcons[randomIndex];
}

// Kjør funksjonen for å sette et tilfeldig smilefjes ved innlasting
setRandomSmiley();

// Vis e-postboksen når brukeren starter å tegne
function showEmailBox() {
    emailBox.style.display = 'block';
}

// Start tegning
function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    pathData = [];
    showEmailBox();  // Vis sendeknappen ved start

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

// Tegning pågår
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
    checkSelection();
}

// Sjekker om prosjekt er ringet rundt
// function checkSelection() {
//     const smiley = document.getElementById('github-smiley');
//     const rect = smiley.getBoundingClientRect();

//     const smileyX = rect.left;
//     const smileyY = rect.top;
//     const smileyW = rect.width;
//     const smileyH = rect.height;

//     // Sjekk om noen av punktene er innenfor smiley-området
//     const inside = pathData.some(p => 
//         p.x > smileyX && p.x < smileyX + smileyW &&
//         p.y > smileyY && p.y < smileyY + smileyH
//     );

//     if (inside) {
//         window.location.href = "https://github.com/henrycmeen";
//     }
// }

// Vis e-postboksen når brukeren starter å tegne
function showEmailBox() {
    document.getElementById('emailBox').style.display = 'block';
}

// Klikkhåndtering for SVG-knappen
document.getElementById('sendEmailButton').addEventListener('click', sendDrawing);

// Funksjon for å sende tegningen via e-post
function sendDrawing() {
    const svgContent = new XMLSerializer().serializeToString(svg);
    const encodedSvg = encodeURIComponent(svgContent);

    // Lag e-postlenken
    const mailtoLink = `mailto:henrycmeen@me.com?subject=Tegning&body=Se vedlagt SVG:%0A${encodedSvg}`;

    // Åpner e-postklienten
    window.location.href = mailtoLink;

    // Skjul e-postboksen etter sending
    document.getElementById('emailBox').style.display = 'none';
}

// Håndtering av touch og mouse events
svg.addEventListener('mousedown', startDrawing);
svg.addEventListener('mousemove', draw);
svg.addEventListener('mouseup', stopDrawing);
svg.addEventListener('mouseleave', stopDrawing);

svg.addEventListener('touchstart', startDrawing);
svg.addEventListener('touchmove', draw);
svg.addEventListener('touchend', stopDrawing);

// Funksjon for å hente riktig posisjon fra både mus og touch
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

// Funksjon for å beregne alder basert på fødselsdato
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

// Sett din fødselsdato (år, måned, dag)
const myAge = calculateAge(1992, 11, 3); 

// Oppdaterer HTML-elementet med ID 'age'
document.getElementById('age').textContent = myAge;
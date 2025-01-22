const svg = document.getElementById('drawingSvg');
let isDrawing = false;
let pathData = [];
let currentPath;

// Start tegning
function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    pathData = [];
    
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
function checkSelection() {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        const rect = project.getBoundingClientRect();
        const inside = pathData.some(p => 
            p.x > rect.left && p.x < rect.right && 
            p.y > rect.top && p.y < rect.bottom
        );

        if (inside) {
            const link = project.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        }
    });
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
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay); // Måned er 0-indeksert i JS
    let age = today.getFullYear() - birthDate.getFullYear();

    // Juster for om bursdagen har vært i år eller ikke
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
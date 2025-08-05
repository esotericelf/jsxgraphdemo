// 2024 II 22.3 - Circle with diameter EB and points A, C, D with animation

// Initialize JSXGraph board
var board = JXG.JSXGraph.initBoard('box', {
    boundingbox: [-8, 6, 8, -6],
    axis: false,
    keepaspectratio: true,
    showcopyright: false,
    shownavigation: false
});

// Refactored: Create base points using map
const basePoints = [
    { x: -5, y: 0, name: 'E' },
    { x: 0, y: 0, name: 'O' },
    { x: 5, y: 0, name: 'B' },
].map(point => createFixPoint(point.x, point.y, point.name));

// Destructure for easier access
const [E, O, B] = basePoints;

O.setAttribute({ visible: false });
// Create circle with diameter EB
const C_1 = createCircle(O, 5);

// Calculate the position for A so that angle ABE = 46°
const angleABE = 46 * Math.PI / 180; // 46 degrees in radians
const radius = 5;

// Calculate A's coordinates for angle ABE = 46°
const angleFromCenterA = Math.PI / 2 - angleABE; // Position A in the upper half
const A_x = B.X() - radius * Math.cos(angleFromCenterA);
const A_y = B.Y() + radius * Math.sin(angleFromCenterA);

// Create glider A at the calculated position
const A = board.create('glider', [A_x, A_y, C_1], {
    name: 'A',
    size: 3,
    color: '#3D5787',
    fixed: true
});

// Calculate the position for D so that angle EBD = 16°
const angleEBD = 16 * Math.PI / 180; // 16 degrees in radians

// Calculate D's coordinates for angle EBD = 16°
// Since angle EBD = 16° and E is at (-5,0), B is at (5,0), D should be positioned accordingly
const angleFromCenterD = Math.PI + angleEBD; // Position D in the lower half
const D_x = O.X() + radius * Math.cos(angleFromCenterD);
const D_y = O.Y() + radius * Math.sin(angleFromCenterD);

// Create glider D at the calculated position
const D = board.create('glider', [D_x, D_y, C_1], {
    name: 'D',
    size: 3,
    color: '#3D5787',
    fixed: true
});

// Create angle ABE (angle at B between A and E) - VISIBLE with value label
const alpha = board.create('angle', [A, B, E], {
    radius: 0.5,
    color: '#FF6B6B',
    name: '46°'
});

// Create angle EBD (angle at B between E and D) - VISIBLE with value label
const beta = board.create('angle', [E, B, D], {
    radius: 2.5,
    color: '#4CAF50',
    name: '16°'
});

// 1) Create point C at the opposite side of A such that AC is a diameter
// C is the antipodal point of A on the circle
const C_x = -1 * A.X();
const C_y = -1 * A.Y();

const C = board.create('point', [C_x, C_y], {
    name: 'C',
    size: 3,
    color: '#3D5787',
    fixed: true
});

// 3) Join AC, AB, BD and BE
const segments = [
    { points: [A, C], name: 'AC' },
    { points: [A, B], name: 'AB' },
    { points: [B, D], name: 'BD' },
    { points: [B, E], name: 'BE' }
].map(segment => board.create('segment', segment.points, {
    strokeColor: '#3D5787',
    strokeWidth: 2
}));

// Destructure for easier access
const [AC, AB, BD, BE] = segments;

// 4) Create point P such that it's the intersection between AC and BD
const P = board.create('intersection', [AC, BD], {
    name: 'P',
    size: 0,
    color: '#FF6B6B',
    fixed: true
});

// 5) Create angle APD (initially hidden)
const angleAPD = board.create('angle', [A, P, D], {
    radius: 0.5,
    color: '#FF6B6B',
    fillOpacity: 1,
    label: false,
    name: '',
    visible: false
});

// Animation sequence
let animationStep = 0;

function startAnimation() {
    // Step 1: Show angle PAB with value label
    setTimeout(() => {
        const anglePAB = board.create('angle', [P, A, B], {
            radius: 1.5,
            color: '#FF6B6B',
            name: '46°'
        });
        board.update();

        // Step 2: Show the equation after 2 seconds
        setTimeout(() => {
            const equationDiv = document.getElementById('equation');
            equationDiv.innerHTML = '\\[\\angle ADP = 46° + 46° + 16° = 108°\\]';

            // Re-render MathJax
            if (window.MathJax) {
                MathJax.typesetPromise([equationDiv]);
            }
        }, 2000);

    }, 1000);
}

// Start animation after board is ready
board.update();
setTimeout(startAnimation, 500);
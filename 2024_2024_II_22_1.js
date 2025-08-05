// 2024 II 22.1 - Circle with diameter EB and points A, C, D

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
// Since A is on the circle and angle ABE = 46°, we need to find A's position
const angleABE = 46 * Math.PI / 180; // 46 degrees in radians
const radius = 5;

// Calculate A's coordinates
// A is on the circle, so we need to find the angle from center O to A
// Since angle ABE = 46° and B is at (5,0), A should be positioned accordingly
const angleFromCenter = Math.PI / 2 - angleABE; // Position A in the upper half
const A_x = O.X() + radius * Math.cos(angleFromCenter);
const A_y = O.Y() + radius * Math.sin(angleFromCenter);

// Create glider A at the calculated position
const A = board.create('glider', [A_x, A_y, C_1], {
    name: 'A',
    size: 3,
    color: '#3D5787',
    fixed: true
});

// Create angle ABE (angle at B between A and E)
const alpha = board.create('angle', [A, B, E], {
    radius: 0.5,
    color: '#FF6B6B',
    name: 'α'
});

board.update();
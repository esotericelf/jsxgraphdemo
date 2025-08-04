// Initialize JSXGraph board for Problem II.18
var board = JXG.JSXGraph.initBoard('box', {
    boundingbox: [-1, 11, 11, -7],
    axis: false,
    keepaspectratio: true,
    showcopyright: false,
    shownavigation: false
});

// Create points with exact coordinates
const A = board.create('point', [10, 0], {
    name: 'A',
    size: 3,
    color: '#3D5787',
    fixed: true
});

const B = board.create('point', [2, 0], {
    name: 'B',
    size: 3,
    color: '#3D5787',
    fixed: true
});

const C = board.create('point', [0, 0], {
    name: 'C',
    size: 3,
    color: '#3D5787',
    fixed: true
});

const D = board.create('point', [2, 5], {
    name: 'D',
    size: 3,
    color: '#3D5787',
    fixed: true
});

const E = board.create('point', [0, -6], {
    name: 'E',
    size: 3,
    color: '#3D5787',
    fixed: true
});

// Create segments
const AB = board.create('segment', [A, B], {
    strokeColor: '#3D5787',
    strokeWidth: 2
});

const BC = board.create('segment', [B, C], {
    strokeColor: '#3D5787',
    strokeWidth: 2
});

const AD = board.create('segment', [A, D], {
    strokeColor: '#3D5787',
    strokeWidth: 2
});

const BD = board.create('segment', [B, D], {
    strokeColor: '#3D5787',
    strokeWidth: 2
});

const CD = board.create('segment', [C, D], {
    strokeColor: '#3D5787',
    strokeWidth: 2
});

const CE = board.create('segment', [C, E], {
    strokeColor: '#3D5787',
    strokeWidth: 2
});

const AE = board.create('segment', [A, E], {
    strokeColor: '#3D5787',
    strokeWidth: 2
});

// Create right angle at ACE
const rightAngle = board.create('angle', [E, C, A], {
    radius: 1.5,
    color: '#FF6B6B',
    name: '',
    radius: 1
});

const rightAngle_2 = board.create('angle', [A, B, D], {
    radius: 1.5,
    color: '#FF6B6B',
    name: '',
    radius: 1
});

// Add segment labels using segmentLabel function from script.js
const segmentPairs = [
    [A, B], [C, B], [A, D], [B, D], [D, C], [C, E], [E, A]
];

const segmentLabels = segmentPairs.map(([p1, p2], index) => {
    const isVisible = !(index === 0 || index === 6); // AB (index 0) and EA (index 6) default to invisible
    return segmentLabel(p1, p2, 0.7, false, false, 2, isVisible);
});

// Create checkboxes to toggle visibility of AB and AE length labels
const checkboxAB = createCheckbox(-0.5, 8, 'Show AB length');
const checkboxAE = createCheckbox(6, 8, 'Show AE length');

// Manually place text labels with original given lengths at midpoints
const lengthLabels = [
    { points: [A, B], length: '35cm', offset: [-0.3, 0.9] },
    { points: [C, B], length: '5cm', offset: [0, -1] },
    { points: [A, D], length: '37cm', offset: [0.3, 1] },
    { points: [B, D], length: '12cm', offset: [1, 0] },
    { points: [D, C], length: '13cm', offset: [-2, 0.3] },
    { points: [C, E], length: '9cm', offset: [-2, 0] },
    { points: [E, A], length: '41cm', offset: [1, -1] }
];

const textLabels = lengthLabels.map(({ points: [p1, p2], length, offset }, index) => {
    const midX = (p1.X() + p2.X()) / 2 + offset[0];
    const midY = (p1.Y() + p2.Y()) / 2 + offset[1];
    const isVisible = !(index === 0 || index === 6); // AB (index 0) and EA (index 6) default to invisible
    return board.create('text', [midX, midY, length], {
        fontSize: 12,
        color: '#333',
        fixed: true,
        visible: isVisible
    });
});

// Add event listeners to toggle visibility
checkboxEvent(checkboxAB, function () {
    segmentLabels[0].setVisible(this.Value()); // AB is first in the array
    textLabels[0].setAttribute({ visible: this.Value() }); // AB text label
});

checkboxEvent(checkboxAE, function () {
    segmentLabels[6].setVisible(this.Value()); // EA is last in the array
    textLabels[6].setAttribute({ visible: this.Value() }); // EA text label
});







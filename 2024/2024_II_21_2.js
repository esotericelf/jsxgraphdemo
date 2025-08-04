// 2024 II 21 - Diagram 2
// Using the setup function from 2024_II_21_utils.js
// Marking equal angles DCF, CFI, CDB, and DBC

const elements = setup2024_II_21({
    baseOptions: {
        boundingbox: [-9, 5, 2, -5]
    }
});

// Define angle configurations
const equalAngles = [
    { points: [elements.points.D, elements.points.C, elements.points.F], name: 'DCF' },
    { points: [elements.points.C, elements.points.F, elements.points.I], name: 'CFI' },
    { points: [elements.points.C, elements.points.D, elements.points.B], name: 'CDB' },
    { points: [elements.points.D, elements.points.B, elements.points.C], name: 'DBC' }
];

const rightAngles = [
    { points: [elements.points.F, elements.points.C, elements.points.G], name: '90°' },
    { points: [elements.points.D, elements.points.E, elements.points.C], name: '90°' }
];

// Create and style equal angles
const equalAngleStyle = {
    strokeColor: '#FF0000',
    strokeWidth: 2,
    radius: 0.8,
    color: '#FF0000',
    fillOpacity: 0.8
};

const equalAngleElements = equalAngles.map(config =>
    createAngle(config.points[0], config.points[1], config.points[2], '', false)
);

equalAngleElements.forEach(angle => angle.setAttribute(equalAngleStyle));

// Create and style right angles
const rightAngleStyle = {
    strokeColor: '#27C8F5',
    strokeWidth: 2,
    radius: 0.5,
    color: '#27C8F5',
    fillOpacity: 0.3
};

const rightAngleElements = rightAngles.map(config =>
    createAngle(config.points[0], config.points[1], config.points[2], config.name, false)
);

rightAngleElements.forEach(angle => angle.setAttribute(rightAngleStyle));

// Create segments CI and FI
const equalSegments = [
    { points: [elements.points.C, elements.points.I], name: 'CI' },
    { points: [elements.points.F, elements.points.I], name: 'FI' }
];

const segmentElements = equalSegments.map(config =>
    createSegment(config.points[0], config.points[1], config.name)
);

// Style segments
segmentElements.forEach(segment =>
    segment.setAttribute({ strokeColor: '#F5B427', strokeWidth: 3 })
);

// Create tick marks for equal segments
const tickMarkElements = equalSegments.map(config =>
    board.create('text', [
        () => config.points[0].X() + (config.points[1].X() - config.points[0].X()) / 3,
        () => config.points[0].Y() + (config.points[1].Y() - config.points[0].Y()) / 3,
        '|'
    ], {
        fontSize: 16,
        color: '#F5B427',
        fixed: true
    })
);

// Create animation text elements
const animationTexts = [
    '∠DCF = ∠CDB',
    '∠DCF = ∠CDB = ∠DBC',
    '∠DCF = ∠CDB = ∠DBC = ∠CFI',
    'CI = FI'
];

const animTextElements = animationTexts.map(text =>
    createText(-7, 3, text, 12, false)
);

// Collect all elements for easy manipulation
const allElements = [
    ...equalAngleElements,
    ...rightAngleElements,
    ...segmentElements,
    ...tickMarkElements,
    ...animTextElements
];

// Hide all elements initially
allElements.forEach(element => element.setAttribute({ visible: false }));

// Animation sequence
let animStep = 0;
const animationSequence = function () {
    // Hide all elements first
    allElements.forEach(element => element.setAttribute({ visible: false }));

    animStep++;

    const showElements = (step) => {
        const elementSets = [
            [equalAngleElements[0], equalAngleElements[2], animTextElements[0]], // Step 1
            [equalAngleElements[0], equalAngleElements[2], equalAngleElements[3], animTextElements[1]], // Step 2
            [equalAngleElements[0], equalAngleElements[2], equalAngleElements[3], equalAngleElements[1], animTextElements[2]], // Step 3
            [equalAngleElements[0], equalAngleElements[2], equalAngleElements[3], equalAngleElements[1], segmentElements[0], segmentElements[1], tickMarkElements[0], tickMarkElements[1], animTextElements[3]] // Step 4
        ];

        elementSets[step - 1].forEach(element => element.setAttribute({ visible: true }));
    };

    if (animStep <= 4) {
        showElements(animStep);
        if (animStep < 4) {
            setTimeout(animationSequence, 1000);
        } else {
            animStep = 0; // Reset for next click
        }
    }
};

// Reset function
const resetAnimation = function () {
    animStep = 0;
    allElements.forEach(element => element.setAttribute({ visible: false }));
};

// Create buttons
const animButton = board.create('button', [-8, 4.5, 'Show Proof', animationSequence], {
    fontSize: 12
});

const resetButton = board.create('button', [-1.5, -4, 'Reset', resetAnimation], {
    fontSize: 12
});
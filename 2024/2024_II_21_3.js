// 2024 II 21 - Diagram 3
// Using the setup function from 2024_II_21_utils.js
// Marking equal sides HC=FE=CB=DA

const elements = setup2024_II_21({
    baseOptions: {
        boundingbox: [-9, 5, 2, -5]
    }
});

// Define equal segments configuration
const equalSegments = [
    { points: [elements.points.H, elements.points.C], name: 'HC' },
    { points: [elements.points.F, elements.points.E], name: 'FE' },
    { points: [elements.points.C, elements.points.B], name: 'CB' },
    { points: [elements.points.D, elements.points.A], name: 'DA' }
];

// Create segments
const segmentElements = equalSegments.map(config =>
    createSegment(config.points[0], config.points[1], config.name)
);

// Style segments to show they are equal
segmentElements.forEach(segment =>
    segment.setAttribute({ strokeColor: '#0000FF', strokeWidth: 3 })
);

// Create tick marks for equal segments using JSXGraph hatch functionality
const tickMarkElements = equalSegments.map(config => {
    const segment = createSegment(config.points[0], config.points[1], config.name);
    return board.create('hatch', [segment, 1], {
        ticksDistance: 0.3,
        face: '|',
        anchor: 0.5,  // midpoint
        strokeColor: '#F5B427',
        strokeWidth: 2,
        fillOpacity: 1,
        opacity: 1
    });
});

// Create animation text elements
const animationTexts = [
    'HC = FE',
    'HC = FE = CB',
    'HC = FE = CB = DA'
];

const animTextElements = animationTexts.map(text =>
    createText(-7, 3, text, 12, false)
);

// Collect all elements for easy manipulation
const allElements = [
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
            [segmentElements[0], segmentElements[1], tickMarkElements[0], tickMarkElements[1], animTextElements[0]], // Step 1: HC = FE
            [segmentElements[0], segmentElements[1], segmentElements[2], tickMarkElements[0], tickMarkElements[1], tickMarkElements[2], animTextElements[1]], // Step 2: HC = FE = CB
            [segmentElements[0], segmentElements[1], segmentElements[2], segmentElements[3], tickMarkElements[0], tickMarkElements[1], tickMarkElements[2], tickMarkElements[3], animTextElements[2]] // Step 3: HC = FE = CB = DA
        ];

        elementSets[step - 1].forEach(element => element.setAttribute({ visible: true }));
    };

    if (animStep <= 3) {
        showElements(animStep);
        if (animStep < 3) {
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
const animButton = board.create('button', [-8, 4.5, 'Step 1', animationSequence], {
    fontSize: 12
});

const resetButton = board.create('button', [-1.5, -4, 'Reset', resetAnimation], {
    fontSize: 12
});
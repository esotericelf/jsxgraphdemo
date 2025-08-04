// 2024 II 21 - Diagram 4
// Using the setup function from 2024_II_21_utils.js
// Marking equal sides HG = FC = DE and HC = DA

const elements = setup2024_II_21({
    baseOptions: {
        boundingbox: [-9, 5, 2, -5]
    }
});

// Define equal segments configuration
const equalSegments = [
    { points: [elements.points.F, elements.points.C], name: 'FC' },
    { points: [elements.points.D, elements.points.E], name: 'DE' }
];

// Define double-tick segments configuration
const doubleTickSegments = [
    { points: [elements.points.H, elements.points.C], name: 'HC' },
    { points: [elements.points.D, elements.points.A], name: 'DA' }
];

// Create segments
const segmentElements = equalSegments.map(config =>
    createSegment(config.points[0], config.points[1], config.name)
);

const doubleTickSegmentElements = doubleTickSegments.map(config =>
    createSegment(config.points[0], config.points[1], config.name)
);

// Style segments to show they are equal (different color from diagram 3)
segmentElements.forEach(segment =>
    segment.setAttribute({ strokeColor: '#FF00FF', strokeWidth: 3 })
);

// Style double-tick segments
doubleTickSegmentElements.forEach(segment =>
    segment.setAttribute({ strokeColor: '#E0AC31', strokeWidth: 3 })
);

// Create tick marks for equal segments using JSXGraph hatch functionality
const tickMarkElements = equalSegments.map(config => {
    const segment = createSegment(config.points[0], config.points[1], config.name);
    return board.create('hatch', [segment, 1], {
        ticksDistance: 0.3,
        face: '|',
        anchor: 0.5,  // midpoint
        strokeColor: '#C227F5',
        strokeWidth: 2,
        fillOpacity: 1,
        opacity: 1
    });
});

// Create double tick marks for HC = DA
const doubleTickMarkElements = doubleTickSegments.map(config => {
    const segment = createSegment(config.points[0], config.points[1], config.name);
    return board.create('hatch', [segment, 2], {
        ticksDistance: 0.2,
        face: '|',
        anchor: 0.5,  // midpoint
        strokeColor: '#E0AC31',
        strokeWidth: 1,
        fillOpacity: 1,
        opacity: 1
    });
});

// Create animation text elements
const animationTexts = [
    'FC = DE'
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

// Make HC = DA segments and their double tick marks visible by default
doubleTickSegmentElements.forEach(segment => segment.setAttribute({ visible: true }));
doubleTickMarkElements.forEach(tick => tick.setAttribute({ visible: true }));

// Animation sequence
let animStep = 0;
const animationSequence = function () {
    // Hide only the animated elements, not the HC = DA elements
    allElements.forEach(element => element.setAttribute({ visible: false }));

    animStep++;

    const showElements = (step) => {
        const elementSets = [
            [segmentElements[0], segmentElements[1], tickMarkElements[0], tickMarkElements[1], animTextElements[0]] // Step 1: FC = DE
        ];

        elementSets[step - 1].forEach(element => element.setAttribute({ visible: true }));
    };

    if (animStep <= 1) {
        showElements(animStep);
        if (animStep < 1) {
            setTimeout(animationSequence, 1000);
        } else {
            animStep = 0; // Reset for next click
        }
    }
};

// Reset function
const resetAnimation = function () {
    animStep = 0;
    // Hide only the animated elements, keep HC = DA visible
    allElements.forEach(element => element.setAttribute({ visible: false }));
};

// Create buttons
const animButton = board.create('button', [-8, 4.5, 'Step 2', animationSequence], {
    fontSize: 12
});

const resetButton = board.create('button', [-1.5, -4, 'Reset', resetAnimation], {
    fontSize: 12
});
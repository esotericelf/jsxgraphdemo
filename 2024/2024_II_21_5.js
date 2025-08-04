// 2024 II 21 - Diagram 5
// Using the setup function from 2024_II_21_utils.js
// Marking equal sides HG = FC = DE and HC = DA (always visible)

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

// Create angle marks for angle AED and angle HFC
const angleAED = createAngle(elements.points.A, elements.points.E, elements.points.D, '', false);
const angleHFC = createAngle(elements.points.H, elements.points.F, elements.points.C, '', false);

// Style the angles
const angleStyle = {
    strokeColor: '#0000FF',
    strokeWidth: 2,
    radius: 0.5,
    color: '#0000FF',
    fillOpacity: 0.6
};

angleAED.setAttribute(angleStyle);
angleHFC.setAttribute(angleStyle);

// Create LaTeX text for triangle congruence
const triangleCongruenceText = createText(-7, 3, '\\triangle ADE \\equiv \\triangle HCF', 12, true);

// Make ALL segments and their tick marks visible by default (static display)
segmentElements.forEach(segment => segment.setAttribute({ visible: true }));
tickMarkElements.forEach(tick => tick.setAttribute({ visible: true }));
doubleTickSegmentElements.forEach(segment => segment.setAttribute({ visible: true }));
doubleTickMarkElements.forEach(tick => tick.setAttribute({ visible: true }));
angleAED.setAttribute({ visible: true });
angleHFC.setAttribute({ visible: true });
triangleCongruenceText.setAttribute({ visible: true });
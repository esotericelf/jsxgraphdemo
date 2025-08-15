// Use the modular base setup (basic version without extra segments)
const diagram = setup2024_II_38_Base();

// Create angles using map
const angleConfigs = [
    { points: [diagram.points.T, diagram.points.A, diagram.points.D], name: 'TAD' },
    { points: [diagram.points.B, diagram.points.C, diagram.points.A], name: 'BCA' },
    { points: [diagram.points.C, diagram.points.P, diagram.points.D], name: 'CPD' }
];

const angles = angleConfigs.map(config =>
    createAngle(config.points[0], config.points[1], config.points[2], config.name, true, {
        radius: 1.5,
        color: '#FF6B6B',
        fillOpacity: 0.3
    })
);

// Destructure for easier access
const [angleACD, angleBCA, angleCPD] = angles;

// Create checkbox to control angle visibility (positioned above point D)
const angleCheckbox = createCheckbox(2, 5, 'Show Angles');

// Set angles to be invisible by default
angleACD.setAttribute({ visible: false });
angleBCA.setAttribute({ visible: false });
angleCPD.setAttribute({ visible: false });

// Add event listener to toggle angles visibility
checkboxEvent(angleCheckbox, function () {
    angleACD.setAttribute({ visible: this.Value() });
    angleBCA.setAttribute({ visible: this.Value() });
    angleCPD.setAttribute({ visible: this.Value() });
});


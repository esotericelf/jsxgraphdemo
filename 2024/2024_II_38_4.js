// Use the modular base setup with extra segment CD and visible angles by default
const diagram = setup2024_II_38_Base();

// Add segment CD
const CD = createSegment(diagram.points.C, diagram.points.D, 'CD');
CD.setAttribute({ dash: 3, strokeColor: '#000000' });


const angleConfigs = [
    { points: [diagram.points.B, diagram.points.P, diagram.points.E], name: 'BPE' },
    { points: [diagram.points.P, diagram.points.E, diagram.points.B], name: 'PEB' }
];

const angles = angleConfigs.map(config =>
    createAngle(config.points[0], config.points[1], config.points[2], config.name, true, {
        radius: 1.2,
        color: '#27C8F5',
        fillOpacity: 0.5,
        visible: false,
    })
);

const [angleACD, angleBCA] = angles;

// Create checkbox to control angle visibility (positioned above point D)
const angleCheckbox = createCheckbox(0, 5, 'Angle sum of Triangle');

// Set angles to be invisible by default
angleACD.setAttribute({ visible: false });
angleBCA.setAttribute({ visible: false });

// Add event listener to toggle angles visibility
checkboxEvent(angleCheckbox, function () {
    angleACD.setAttribute({ visible: this.Value() });
    angleBCA.setAttribute({ visible: this.Value() });
});

const angleDEB = createAngle(diagram.points.E, diagram.points.B, diagram.points.P, "DEB", true, {
    radius: 1.2,
    color: '#F5B027',
    fillOpacity: 0.5
});
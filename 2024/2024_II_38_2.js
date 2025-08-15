// Use the modular base setup with extra segment CD and visible angles by default
const diagram = setup2024_II_38_Base();

// Add segment CD
const CD = createSegment(diagram.points.C, diagram.points.D, 'CD');
CD.setAttribute({ dash: 3, strokeColor: '#000000' });

const angleConfigs = [
    { points: [diagram.points.T, diagram.points.A, diagram.points.D], name: 'TAD' },
    { points: [diagram.points.A, diagram.points.C, diagram.points.D], name: 'ACD' }
];

const angles = angleConfigs.map(config =>
    createAngle(config.points[0], config.points[1], config.points[2], config.name, true, {
        radius: 1.2,
        color: '#27C8F5',
        fillOpacity: 0.5
    })
);
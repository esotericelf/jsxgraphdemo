// Refactored version using the new setup function
const elements = setup2024_II_17({
    baseTriangleText: {
        x: -0.5,
        y: 1.5,
        content: '4cm^2'
    }
});

// Add segment labels
const BM_s = segmentLabel(elements.points.M, elements.points.H, 0.5, false, false, 0);
const MF_s = segmentLabel(elements.points.F, elements.points.G, 0.5, false, false, 0);

// Add text elements
const txt2 = createText(
    () => elements.points.M.X() + 0.2,
    () => (elements.points.H.Y() + elements.points.M.Y()) / 2 + 0.2,
    '2',
    12,
    true
);

const txt3 = createText(
    () => elements.points.F.X() + 0.2,
    () => (elements.points.G.Y() + elements.points.F.Y()) / 2,
    '5',
    12,
    true
);

// Add additional trapezium polygon
const trapezium = createPolygon([elements.points.H, elements.points.M, elements.points.F, elements.points.G], {
    fillColor: '#305FB3',
    fillOpacity: 0.6
});

// Add trapezium area text
const txt5 = createText(
    () => (elements.points.C.X() + elements.points.H.X()) / 2,
    () => (elements.points.C.Y() + elements.points.G.Y()) / 2,
    '21cm^2',
    12,
    true
);



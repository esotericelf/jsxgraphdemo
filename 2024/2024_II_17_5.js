// Refactored version using the new setup function
const elements = setup2024_II_17({
    baseTriangleText: {
        x: -0.5,
        y: 1.5,
        content: '4cm^2'
    }
});

// Add segment labels
const BC_s = segmentLabel(elements.points.C, elements.points.F, 0.5, false, false, 0);
const CF_s = segmentLabel(elements.points.B, elements.points.C, 0.5, false, false, 0);

// Add text elements
const txt2 = createText(
    () => (elements.points.B.X() + elements.points.C.X()) / 2,
    () => elements.points.C.Y() - 1,
    '4',
    12,
    true
);

const txt3 = createText(
    () => (elements.points.F.X() + elements.points.C.X()) / 2,
    () => elements.points.C.Y() - 1,
    '1',
    12,
    true
);

const txt4 = createText(
    () => elements.points.C.X(),
    () => elements.points.C.Y() - 1,
    ':',
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
    '19cm^2',
    12,
    true
);

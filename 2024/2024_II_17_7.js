// Refactored version using the new setup function
const elements = setup2024_II_17({
    baseTriangleText: {
        x: -0.5,
        y: 1.5,
        content: '4cm^2'
    }
});

// Override the base triangle text position
elements.baseTriangleTextElement.setPosition(
    () => (elements.points.B.X() + elements.points.M.X()) / 2,
    () => elements.points.B.Y() + 0.5
);

// Add additional polygons
const trapezium = createPolygon([elements.points.H, elements.points.M, elements.points.C, elements.points.G], {
    fillColor: '#305FB3',
    fillOpacity: 0.6
});

const triangle_2 = createPolygon([elements.points.A, elements.points.B, elements.points.H], {
    fillColor: '#8839C4',
    fillOpacity: 0.6
});

const triangle_3 = createPolygon([elements.points.G, elements.points.D, elements.points.E], {
    fillColor: '#C4BF39',
    fillOpacity: 0.6
});

// Add area texts
const txt3 = createText(
    () => elements.points.A.X() + 0.2,
    () => (elements.points.A.Y() + elements.points.B.Y()) / 2,
    '16cm^2',
    12,
    true
);

const txt4 = createText(
    () => (elements.points.C.X() + elements.points.H.X()) / 2,
    () => (elements.points.C.Y() + elements.points.G.Y()) / 2,
    '16cm^2',
    12,
    true
);

const txt5 = createText(
    () => (elements.points.E.X() + elements.points.D.X()) / 2,
    () => (elements.points.D.Y() + elements.points.G.Y()) / 2,
    '5cm^2',
    12,
    true
);

// Refactored version using the new setup function
const elements = setup2024_II_17({
    baseTriangleText: {
        x: -0.5,
        y: 1.5,
        content: '4cm^2'
    }
});

// Add additional triangles
const triangle_2 = createPolygon([elements.points.C, elements.points.F, elements.points.G], {
    fillColor: '#C4BF39',
    fillOpacity: 0.6
});

const triangle_3 = createPolygon([elements.points.G, elements.points.D, elements.points.E], {
    fillColor: '#C4BF39',
    fillOpacity: 0.6
});

// Add triangle area texts
const txt4 = createText(
    () => (elements.points.C.X() + elements.points.F.X()) / 2,
    () => (elements.points.C.Y() + elements.points.G.Y()) / 2,
    '5cm^2',
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

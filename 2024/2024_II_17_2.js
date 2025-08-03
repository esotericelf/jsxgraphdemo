// Refactored version using the new setup function
const elements = setup2024_II_17({
    baseTriangleText: {
        x: -0.5,
        y: 1.5,
        content: '4cm^2'
    }
});

// Add segment labels
const BM_s = segmentLabel(elements.points.B, elements.points.M, 0.5, false, false, 0);
const MF_s = segmentLabel(elements.points.M, elements.points.F, 0.5, false, false, 0);

// Add text elements
const txt2 = createText(
    () => (elements.points.B.X() + elements.points.M.X()) / 2,
    () => elements.points.B.Y() - 1,
    '2',
    12,
    true
);

const txt3 = createText(
    () => (elements.points.F.X() + elements.points.M.X()) / 2,
    () => elements.points.B.Y() - 1,
    '3',
    12,
    true
);

const txt4 = createText(
    () => elements.points.M.X(),
    () => elements.points.M.Y() - 1,
    ':',
    12,
    true
);



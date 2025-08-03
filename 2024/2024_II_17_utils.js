/**
 * 2024_II_17 Specific Utility Functions
 * These functions are specific to the 2024_II_17 problem series and should not be used globally.
 */

/**
 * Creates the base square setup for 2024_II_17 problems
 * @param {Object} options - Configuration options
 * @returns {Object} - All created elements
 */
const createBaseSquare2024_II_17 = (options = {}) => {
    const {
        boundingbox = [-2, 10, 14, -2],
        squareSize = 8,
        squareX = 0,
        squareY = 0
    } = options;

    // Initialize board (set global board variable)
    board = JXG.JSXGraph.initBoard('box', {
        boundingbox: boundingbox,
        axis: false,
        keepaspectratio: true,
        showcopyright: false,
        shownavigation: false
    });

    // 1. Square points (A→B→C→D→A anticlockwise)
    const A = createFixPoint(squareX, squareY + squareSize, 'A');  // Top-left
    const B = createFixPoint(squareX, squareY, 'B');              // Bottom-left
    const C = createFixPoint(squareX + squareSize, squareY, 'C'); // Bottom-right
    const D = createFixPoint(squareX + squareSize, squareY + squareSize, 'D'); // Top-right

    // 2. Square sides
    const AB = createSegment(A, B, 'AB');
    const BC = createSegment(B, C, 'BC');
    const CD = createSegment(C, D, 'CD');
    const DA = createSegment(D, A, 'DA');

    // 3. M = Midpoint of BC
    const M = board.create('midpoint', [B, C], {
        name: 'M',
        size: 2,
        color: '#3D5787',
        fixed: true
    });

    // 4. E divides AD in 3:1 (AE:ED = 3:1)
    const E = board.create('point', [
        () => A.X() + (D.X() - A.X()) * 3 / 4,
        () => A.Y() + (D.Y() - A.Y()) * 3 / 4
    ], {
        name: 'E',
        size: 2,
        color: '#3D5787',
        fixed: true
    });

    // 5. F point (distance from M equal to A to E)
    const F = board.create('point', [
        () => M.X() + A.Dist(E),
        () => M.Y()
    ], {
        name: 'F',
        size: 2,
        color: '#3D5787',
        fixed: true
    });

    // 6. AM segment
    const AM = createSegment(A, M, 'AM');

    // 7. EF segment
    const EF = createSegment(E, F, 'EF');

    // 8. BF segment
    const BF = createSegment(B, F, 'BF');

    // 9. G = CD ∩ EF
    const G = board.create('intersection', [CD, EF, 0], {
        name: 'G',
        size: 2,
        color: '#3D5787'
    });

    // 10. BG segment
    const BG = createSegment(B, G, 'BG');

    // 11. H = AM ∩ BG
    const H = board.create('intersection', [AM, BG, 0], {
        name: 'H',
        size: 2,
        color: '#3D5787'
    });

    // 12. Base triangle BHM
    const triangle = createPolygon([B, H, M], {
        fillColor: '#F54927',
        fillOpacity: 0.6
    });

    return {
        points: { A, B, C, D, M, E, F, G, H },
        segments: { AB, BC, CD, DA, AM, EF, BF, BG },
        triangle
    };
};

/**
 * Creates text elements based on configuration
 * @param {Array} textConfigs - Array of text configurations
 * @returns {Array} - Array of created text elements
 */
const createTextElements = (textConfigs) => {
    return textConfigs.map(config => {
        const { x, y, content, fontSize = 12, useMathJax = true } = config;
        return createText(x, y, content, fontSize, useMathJax);
    });
};

/**
 * Creates segment labels based on configuration
 * @param {Array} labelConfigs - Array of label configurations
 * @returns {Array} - Array of created label objects
 */
const createSegmentLabels = (labelConfigs) => {
    return labelConfigs.map(config => {
        const { point1, point2, height = 0.5, showLength = false, showLabel = false, decimalPlaces = 0, visible = true } = config;
        return segmentLabel(point1, point2, height, showLength, showLabel, decimalPlaces, visible);
    });
};

/**
 * Creates additional polygons based on configuration
 * @param {Array} polygonConfigs - Array of polygon configurations
 * @returns {Array} - Array of created polygon elements
 */
const createAdditionalPolygons = (polygonConfigs) => {
    return polygonConfigs.map(config => {
        const { points, attributes = {} } = config;
        return createPolygon(points, attributes);
    });
};

/**
 * Complete setup for 2024_II_17 problems with all customizations
 * @param {Object} config - Complete configuration object
 * @returns {Object} - All created elements
 */
const setup2024_II_17 = (config = {}) => {
    const {
        baseOptions = {},
        texts = [],
        segmentLabels = [],
        additionalPolygons = [],
        baseTriangleText = { x: -0.5, y: 1.5, content: '4cm^2' }
    } = config;

    // Create base square setup
    const baseElements = createBaseSquare2024_II_17(baseOptions);

    // Create base triangle text
    const baseTriangleTextElement = createText(
        baseTriangleText.x,
        baseTriangleText.y,
        baseTriangleText.content,
        baseTriangleText.fontSize || 12,
        baseTriangleText.useMathJax !== false
    );

    // Create additional text elements
    const textElements = createTextElements(texts);

    // Create segment labels
    const labelElements = createSegmentLabels(segmentLabels);

    // Create additional polygons
    const polygonElements = createAdditionalPolygons(additionalPolygons);

    return {
        ...baseElements,
        baseTriangleTextElement,
        textElements,
        labelElements,
        polygonElements
    };
};
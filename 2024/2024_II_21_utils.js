/**
 * 2024_II_21 Specific Utility Functions
 * These functions are specific to the 2024_II_21 problem series and should not be used globally.
 */

/**
 * Creates the base rhombus setup for 2024_II_21 problems
 * @param {Object} options - Configuration options
 * @returns {Object} - All created elements
 */
const createBaseRhombus2024_II_21 = (options = {}) => {
    const {
        boundingbox = [-10, 6, 10, -8]
    } = options;

    // Initialize board (set global board variable)
    board = JXG.JSXGraph.initBoard('box', {
        boundingbox: boundingbox,
        axis: false,
        keepaspectratio: true,
        showcopyright: false,
        shownavigation: false
    });

    // 1. Rhombus points (ABCE)
    const A = createFixPoint(-8, -5, 'A');
    const B = createFixPoint(-3, -5, 'B');
    const C = createFixPoint(-8 / 5, -1 / 5, 'C');
    const D = createFixPoint(-33 / 5, -1 / 5, 'D');

    // 2. E is the intersection of rhombus diagonals
    const E = board.create('intersection', [
        board.create('segment', [A, C]),
        board.create('segment', [B, D])
    ], {
        name: 'E',
        size: 2,
        color: '#3D5787',
        fixed: true
    });

    // 3. Rhombus sides
    const AB = createSegment(A, B, 'AB');
    const BC = createSegment(B, C, 'BC');
    const CD = createSegment(C, D, 'CD');
    const DA = createSegment(D, A, 'DA');

    // 4. Rhombus diagonals
    const AC = createSegment(A, C, 'AC');
    const BD = createSegment(B, D, 'BD');

    // 5. H point (BC extended)
    const H = createFixPoint(-1 / 5, 23 / 5, 'H');
    const BH = createSegment(B, H, 'BH');

    // 6. I = midpoint of CD
    const I = board.create('midpoint', [C, D], {
        name: 'I',
        size: 2,
        color: '#3D5787',
        fixed: true
    });

    // 7. F point (EI extended)
    const F = createFixPoint(-17 / 5, 11 / 5, 'F');
    const EI = createSegment(E, I, 'EI');
    const IF = createSegment(I, F, 'IF');

    // 8. G point
    const G = board.create('point', [8 / 5, 11 / 5], {
        name: 'G',
        size: 2,
        color: '#000000',
        fixed: true,
        label: { offset: [5, 5] }
    });

    // 9. Rectangle CFHG sides
    const CF = createSegment(C, F, 'CF');
    const FH = createSegment(F, H, 'FH');
    const HG = createSegment(H, G, 'HG');
    const GC = createSegment(G, C, 'GC');

    return {
        points: { A, B, C, D, E, H, I, F, G },
        segments: { AB, BC, CD, DA, AC, BD, BH, EI, IF, CF, FH, HG, GC },
        rhombus: { AB, BC, CD, DA, AC, BD },
        rectangle: { CF, FH, HG, GC }
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
 * Complete setup for 2024_II_21 problems with all customizations
 * @param {Object} config - Complete configuration object
 * @returns {Object} - All created elements
 */
const setup2024_II_21 = (config = {}) => {
    const {
        baseOptions = {},
        texts = [],
        segmentLabels = [],
        additionalPolygons = []
    } = config;

    // Create base rhombus setup
    const baseElements = createBaseRhombus2024_II_21(baseOptions);

    // Create additional text elements
    const textElements = createTextElements(texts);

    // Create segment labels
    const labelElements = createSegmentLabels(segmentLabels);

    // Create additional polygons
    const polygonElements = createAdditionalPolygons(additionalPolygons);

    return {
        ...baseElements,
        textElements,
        labelElements,
        polygonElements
    };
};
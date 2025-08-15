/**
 * Base setup for 2024_II_38 problems
 * This function creates all the common elements and returns them for further customization
 */
const setup2024_II_38_Base = (options = {}) => {
    const {
        boundingbox = [-2, 12, 12, -2],
    } = options;

    // Initialize board (set global board variable)
    board = JXG.JSXGraph.initBoard('box', {
        boundingbox: boundingbox,
        grid: false,
        axis: false,
        keepaspectratio: false,
        showcopyright: false,
        shownavigation: false
    });

    // Calculate trigonometric values
    const tan29 = Math.tan(29 * Math.PI / 180);
    const tan69 = Math.tan(69 * Math.PI / 180);
    const tan82 = Math.tan(82 * Math.PI / 180);

    // Create base points
    const P = createFixPoint(0, 0, 'P');
    const B = createFixPoint(10, 0, 'B');
    const C = createFixPoint(6, 0, 'C');

    // Calculate point E coordinates
    const E_x = 10 / ((tan29 / tan69) + 1);
    const E_y = 10 / ((1 / tan69) + (1 / tan29));
    const E = createFixPoint(E_x, E_y, 'E');

    // D coordinates
    const D_x = 6 / ((tan29 / tan82) + 1);
    const D_y = 6 / ((1 / tan82) + (1 / tan29));
    const D = createFixPoint(D_x, D_y, 'D');

    // Create triangle PBE
    const trianglePBE = createPolygon([P, B, E], {
        fillOpacity: 0,
        borders: { strokeColor: '#33C918', strokeWidth: 2 }
    });

    // Create circle
    const circleBCDE = board.create('circle', [B, E, C], {
        strokeColor: '#000000',
        strokeWidth: 2,
        fillColor: 'none',
        name: 'C_o'
    });

    // Create point A using the construction method
    const tan43 = Math.tan(43 * Math.PI / 180);
    const V = board.create('point', [C.X() + 1, C.Y() + tan43], {
        name: 'V',
        visible: false
    });

    const L_1 = board.create('line', [C, V], {
        strokeColor: '#000000',
        strokeWidth: 1,
        visible: false
    });

    const A_1 = board.create('intersection', [L_1, circleBCDE, 0], {
        name: 'A',
        size: 2,
        color: '#000000',
        fixed: true,
        visible: false
    });

    const A = createGlider(A_1.X(), A_1.Y(), circleBCDE, "A");
    const Tau = board.create('tangent', [A], { visible: false });
    const T = createGlider(A_1.X() - 2, A_1.Y() - Tau.Slope() * 2, Tau, "T");

    // Create base segments
    const segments = [
        { points: [C, A], name: 'CA' },
        { points: [A, D], name: 'AD' },
        { points: [T, A], name: 'TA' }
    ].map(segment => createSegment(segment.points[0], segment.points[1], segment.name));

    const [CA, AD, TA] = segments;

    return {
        board,
        points: { P, B, C, D, E, A, T, V, A_1 },
        segments: { CA, AD, TA },
        elements: { trianglePBE, circleBCDE, Tau, L_1 }
    };
};

// Initialize with PROPER bounds
var board = JXG.JSXGraph.initBoard('box', {
    boundingbox: [-2, 12, 12, -2],
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

// Create points
const P = createFixPoint(0, 0, 'P');
const B = createFixPoint(10, 0, 'B');

// Calculate point E coordinates
const E_x = 10 / ((tan29 / tan69) + 1);
const E_y = 10 / ((1 / tan69) + (1 / tan29));
const E = createFixPoint(E_x, E_y, 'E');

// C is at (6, 0)
const C = createFixPoint(6, 0, 'C');

// D coordinates: D(6/(tan29/tan82 + 1), 6/(1/tan82 + 1/tan29))
const D_x = 6 / ((tan29 / tan82) + 1);
const D_y = 6 / ((1 / tan82) + (1 / tan29));
const D = createFixPoint(D_x, D_y, 'D');

// Create triangle PBE using createPolygon function
const trianglePBE = createPolygon([P, B, E], { fillOpacity: 0 });

// Create circle passing through B, E, C, D
const circleBCDE = board.create('circle', [B, E, C], {
    strokeColor: '#000000',
    strokeWidth: 2,
    fillColor: 'none'
});

// Create point A on the minor arc EB of the circle
// A.X() must be greater than B.X() (A is to the right of B)
const A = board.create('glider', [11, 3, circleBCDE], {
    name: 'A',
    color: '#000000',
    size: 3
});

// Create tangent segment from A upward to point T
const tangentAT = board.create('segment', [
    A,
    function () {
        // Calculate tangent direction (perpendicular to radius)
        const center = circleBCDE.center;
        const radius = circleBCDE.radius;
        const dx = A.X() - center.X();
        const dy = A.Y() - center.Y();
        // Normalize and rotate 90 degrees (tangent direction)
        const length = Math.sqrt(dx * dx + dy * dy);
        const tangentX = -dy / length;
        const tangentY = dx / length;
        // Extend upward by 2 units
        return [A.X() + tangentX * 2, A.Y() + tangentY * 2];
    }
], {
    strokeColor: '#000000',
    strokeWidth: 2
});

// Create point T at the end of the tangent segment
const T = board.create('point', [
    function () {
        const center = circleBCDE.center;
        const dx = A.X() - center.X();
        const dy = A.Y() - center.Y();
        const length = Math.sqrt(dx * dx + dy * dy);
        const tangentX = -dy / length;
        const tangentY = dx / length;
        return A.X() + tangentX * 2;
    },
    function () {
        const center = circleBCDE.center;
        const dx = A.X() - center.X();
        const dy = A.Y() - center.Y();
        const length = Math.sqrt(dx * dx + dy * dy);
        const tangentX = -dy / length;
        const tangentY = dx / length;
        return A.Y() + tangentY * 2;
    }
], {
    name: 'T',
    color: '#000000',
    size: 3
});

// Create segments DA and CA
const segmentDA = board.create('segment', [D, A], {
    strokeColor: '#000000',
    strokeWidth: 2
});

const segmentCA = board.create('segment', [C, A], {
    strokeColor: '#000000',
    strokeWidth: 2
});



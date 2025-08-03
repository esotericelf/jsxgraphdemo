// Initialize board with extended x-axis for F
var board = JXG.JSXGraph.initBoard('box', {
    boundingbox: [-2, 10, 14, -2],  // x-min, y-max, x-max, y-min (extended right for F)
    axis: false,
    keepaspectratio: true,
    showcopyright: false,
    shownavigation: false
});

// 1. Square points (A→B→C→D→A anticlockwise)
const A = createFixPoint(0, 8, 'A');  // Top-left
const B = createFixPoint(0, 0, 'B');  // Bottom-left
const C = createFixPoint(8, 0, 'C');  // Bottom-right
const D = createFixPoint(8, 8, 'D');  // Top-right

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
    () => A.X() + (D.X() - A.X()) * 3 / 4,  // (6,8)
    () => A.Y() + (D.Y() - A.Y()) * 3 / 4
], {
    name: 'E',
    size: 2,
    color: '#3D5787',
    fixed: true
});

const F = board.create('point',[
    () => M.X() + A.Dist(E),
    () => M.Y()
], {
     name:'F', 
     size:2, 
     color:'#3D5787',
     fixed:true
});

// 5. AM segment
const AM = createSegment(A, M, 'AM');

// 7. EF segment (parallel to AM)
const EF = createSegment(E, F, 'EF');

const BF = createSegment(B, F, 'BF');

// 8. G = CD ∩ EF
const G = board.create('intersection', [CD, EF, 0], {
    name: 'G',
    size: 2,
    color: '#3D5787'
});

// 9. BG segment
const BG = createSegment(B, G, 'BG');

// 10. H = AM ∩ BG
const H = board.create('intersection', [AM, BG, 0], {
    name: 'H',
    size: 2,
    color: '#3D5787'
});

const triangle = createPolygon([B, H, M], {
    fillColor: '#F54927', fillOpacity:0.6
});

const txt = createText(-0.5, 1.5, '4cm^2', 12, true)   

const BM_s = segmentLabel(B, M, 0.5, false, false, 0);
const MF_s = segmentLabel(M, F, 0.5, false, false, 0);

const textConfigs = [
  { name: 'txt2', x: (B.X() + M.X()) / 2, y: B.Y() - 1, content: '2' },
  { name: 'txt3', x: (F.X() + M.X()) / 2, y: B.Y() - 1, content: '3' },
  { name: 'txt4', x: M.X(), y: M.Y() - 1, content: ':' }
];

const [txt2, txt3, txt4] = textConfigs.map(({ x, y, content }) => 
  createText(x, y, content, 12, true)
);



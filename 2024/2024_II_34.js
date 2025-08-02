// Initialize with PROPER bounds
var board = JXG.JSXGraph.initBoard('box', {
    boundingbox: [-1, 40, 10, -5],  // Expanded space
    grid: false,
    axis: false,
    keepaspectratio: false,
    showcopyright: false,
    shownavigation: false
});

// Create axes with ONLY required labels
const xAxis = board.create('axis', [[0, 0], [1, 0]], {
    name: '√x',
    withLabel: true,
    label: { position: 'rt', offset: [-15, -20] },
    ticks: { drawLabels: false }
});

const yAxis = board.create('axis', [[0, 0], [0, 1]], {
    name: 'y³',
    withLabel: true,
    label: { position: 'rt', offset: [20, -10] },
    ticks: { drawLabels: false }
});

// Create points and lines
const l1= createLine([0,32],[2,0],'l_1')
const p1=createFixPoint(2,0,'2')
const p2=createFixPoint(0,32,'32')


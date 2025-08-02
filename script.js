// var board = JXG.JSXGraph.initBoard('box', { boundingbox: [-10, 10, 10, -10], grid: false, axis: false, keepaspectratio: true, showcopyright: false, shownavigation: false });


//x-coordinates, y-coordinates and n is the name

const createFixPoint = (x, y, n) => {
  return board.create('point', [x, y], { fixed: true, size: 2, color: '#000000', name: n })
}

//x-coordinates, y-coordinates, z is a curve object and n is the name
const createGlider = (x, y, z, n) => {
  return board.create('glider', [x, y, z], { size: 2, color: '#1D65D3', name: n })
}
//p, q are two points objects and n is the name
const createLine = (p, q, n) => {
  return board.create('line', [p, q], { strokeColor: '#00ff00', strokeWidth: 2, color: '#6CD850', name: n })
}

//p, q are two points objects and n is the name
const createSegment = (p, q, n) => {
  return board.create('segment', [p, q], { strokeColor: '#00ff00', strokeWidth: 2, color: '#6CD850', name: n })
}


// p , q , r are points objects, n is name in text
const createPerpendicular = (p, q, r, n) => {
  var a = createLine(q,r,n)
  a.setAttribute({visible:false})
  return board.create('perpendicular', [a, p], { strokeColor: '#00ff00', strokeWidth: 2, color: '#6CD850', name: n })
}

//l_1, l_2 are two lines object and n is the name
const linesIntersection = (l_1,l_2,n) => {
  return board.create('intersection', [l_1, l_2], { fixed: true, size: 2, color: '#000000', name: n })
}


const lineCircleIntersection = (l_1,l_2,pos,n) => {
  return board.create('intersection', [l_1, l_2,pos], { fixed: true, size: 2, color: '#000000', name: n })
}

//o is the centre which is a point object, r is an integer (radius), n is the name
const createCircle = (o, r, n) => {
  return board.create('circle', [o, r], { strokeColor: '#00ff00', strokeWidth: 2, color: '#F1B62E', fillOpacity: 0, name: n })
}

//p,q,r are three points object and n is the name, if showangle is true, value is displayed instead of angle
const createAngle = (p, q, r, n, showangle) => {
  return board.create('nonreflexangle', [p, q, r], {
    strokeColor: '#00ff00', strokeWidth: 1, radius: 0.5, color: '#F5479E', fillOpacity: 0.5, name: function() {
      if (showangle) {
        if (JXG.Math.Geometry.trueAngle(p, q, r) > 180) { return 360 - JXG.Math.Geometry.trueAngle(p, q, r).toFixed(0) + '°'; }
        else { return JXG.Math.Geometry.trueAngle(p, q, r).toFixed(0) + '°'; }
      }
      else { return n }
    }
  })
}

//p is the function in text, left and right are the starting and ending boundary, n is the name
const createGraph = (p, left, right, n) => {
  return board.create('functiongraph', [p, left, right], { strokeColor: 'black', strokeWidth: 2, fixed: false, name: n });
}

//x, y are the position of the text, tx are the text, fs is the fontsize, mj is the boolean of whether mathjax applies
const createText = (x, y, tx, fs, mj) => {
  return board.create('text', [x, y, '$$' + tx + '$$'], { fontsize: fs, fixed: true, parse: false, useMathJax: mj });
}

//p is a point object, fs is fontsize, mj is MathJax boolean
const coordinatesLabel = (p, offset, fs, mj) => {
  return board.create('text', [p.X() + offset, p.Y() + offset, p.name + "(" + p.X() + "," + p.Y() + ")"]), { useMathJax: mj, fontSize: fs }
}

//p, q are points objects, h is the height of the bezier curve, showlenght is a boolean, dp stands for display decimal places 
const segmentLabel = (p, q, h, showlength, dp) => {
  var crl = board.create('curve', [[0], [0]], { strokeWidth: 1, strokeColor: 'black' });
  crl.bezierDegree = 3;
  crl.updateDataArray = function() {
    var d = [p.X() - q.X(), p.Y() - q.Y()],
      dl = Math.sqrt(d[0] * d[0] + d[1] * d[1]),
      mid = [(q.X() + p.X()) * 0.5, (q.Y() + p.Y()) * 0.5];

    d[0] *= h / dl;
    d[1] *= h / dl;

    this.dataX = [q.X(), q.X() - d[1], mid[0], mid[0] - d[1], mid[0], p.X() - d[1], p.X()];
    this.dataY = [q.Y(), q.Y() + d[0], mid[1], mid[1] + d[0], mid[1], p.Y() + d[0], p.Y()];
  };
  // Text
  return board.create('text', [
    function() {
      var d = [p.X() - q.X(), p.Y() - q.Y()],
        dl = Math.sqrt(d[0] * d[0] + d[1] * d[1]),
        mid = (q.X() + p.X()) * 0.5;

      d[1] *= h / dl;
      return mid - d[1] + 0.1;
    },
    function() {
      var d = [p.X() - q.X(), p.Y() - q.Y()],
        dl = Math.sqrt(d[0] * d[0] + d[1] * d[1]),
        mid = (q.Y() + p.Y()) * 0.5;

      d[0] *= h / dl;
      return mid + d[0] + 0.1;
    },
    function() {
      if (showlength) { return '$$' + p.Dist(q).toFixed(2) + '$$'; }
      else { return '$$' + p.name + q.name + '$$' }
    }
  ], { fontSize: 16, useMathJax: true });
}

//x and y are coordinates where the checkbox should appear and tx is the descriptive text
const createCheckbox = (x,y,tx)=>{
  return board.create('checkbox', [x, y, tx])
}

//cb is the checkbox object and fx is the function object pertaining to the change specified
const checkboxEvent = (cb,fx)=> {
  JXG.addEvent(cb.rendNodeCheckbox, 'change', fx, cb);  
}

/**
 * Creates a polygon with variable number of points (minimum 3)
 * @param {Array} points - Array of point coordinates [[x1,y1], [x2,y2], ...]
 * @param {Object} attributes - JSXGraph attributes for the polygon
 */
const createPolygon = (points, attributes = {}) => {
    if (points.length < 3) {
        throw new Error("Polygon requires at least 3 points");
    }

    return board.create('polygon', points, {
        borders: { strokeColor: 'blue', strokeWidth: 2 },  // Default border
        vertices: { visible: false },                      // Hide vertices
        fillOpacity: 0.5,                                 // Default opacity
        ...attributes                                     // User args OVERRIDE defaults
    });
};
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
  var a = createLine(q, r, n)
  a.setAttribute({ visible: false })
  return board.create('perpendicular', [a, p], { strokeColor: '#00ff00', strokeWidth: 2, color: '#6CD850', name: n })
}

//l_1, l_2 are two lines object and n is the name
const linesIntersection = (l_1, l_2, n) => {
  return board.create('intersection', [l_1, l_2], { fixed: true, size: 2, color: '#000000', name: n })
}


const lineCircleIntersection = (l_1, l_2, pos, n) => {
  return board.create('intersection', [l_1, l_2, pos], { fixed: true, size: 2, color: '#000000', name: n })
}

//o is the centre which is a point object, r is an integer (radius), n is the name
const createCircle = (o, r, n) => {
  return board.create('circle', [o, r], { strokeColor: '#00ff00', strokeWidth: 2, color: '#F1B62E', fillOpacity: 0, name: n })
}

//p,q,r are three points object and n is the name, if showangle is true, value is displayed instead of angle
const createAngle = (p, q, r, n, showangle) => {
  return board.create('nonreflexangle', [p, q, r], {
    strokeColor: '#00ff00', strokeWidth: 1, radius: 0.5, color: '#F5479E', fillOpacity: 0.5, name: function () {
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
const segmentLabel = (p, q, h, showlength, showlabel, dp, visible = true) => {
  // Create curve (hidden initially if visible is false)
  var crl = board.create('curve', [[0], [0]], {
    strokeWidth: 1,
    strokeColor: 'black',
    visible: visible // Set initial visibility
  });

  crl.bezierDegree = 3;
  crl.updateDataArray = function () {
    var d = [p.X() - q.X(), p.Y() - q.Y()],
      dl = Math.sqrt(d[0] * d[0] + d[1] * d[1]),
      mid = [(q.X() + p.X()) * 0.5, (q.Y() + p.Y()) * 0.5];

    d[0] *= h / dl;
    d[1] *= h / dl;

    this.dataX = [q.X(), q.X() - d[1], mid[0], mid[0] - d[1], mid[0], p.X() - d[1], p.X()];
    this.dataY = [q.Y(), q.Y() + d[0], mid[1], mid[1] + d[0], mid[1], p.Y() + d[0], p.Y()];
  };

  // Create text (hidden initially if visible is false)
  const text = board.create('text', [
    function () {
      var d = [p.X() - q.X(), p.Y() - q.Y()],
        dl = Math.sqrt(d[0] * d[0] + d[1] * d[1]),
        mid = (q.X() + p.X()) * 0.5;

      d[1] *= h / dl;
      return mid - d[1] + 0.1;
    },
    function () {
      var d = [p.X() - q.X(), p.Y() - q.Y()],
        dl = Math.sqrt(d[0] * d[0] + d[1] * d[1]),
        mid = (q.Y() + p.Y()) * 0.5;

      d[0] *= h / dl;
      return mid + d[0] + 0.1;
    },
    function () {
      if (!visible) return ''; // Return empty if not visible
      if (showlength) { return '$$' + p.Dist(q).toFixed(2) + '$$'; }
      else if (showlabel) { return '$$' + p.name + q.name + '$$'; }
      else { return ''; }
    }
  ], {
    fontSize: 16,
    useMathJax: true,
    visible: visible // Set initial visibility
  });

  // Return both elements with a method to toggle visibility
  return {
    curve: crl,
    text: text,
    setVisible: (state) => {
      crl.setAttribute({ visible: state });
      text.setAttribute({ visible: state });
      if (!state) text.setText(''); // Clear text when hiding
      board.update();
    }
  };
}

//x and y are coordinates where the checkbox should appear and tx is the descriptive text
const createCheckbox = (x, y, tx) => {
  return board.create('checkbox', [x, y, tx], { fixed: true })
}

//cb is the checkbox object and fx is the function object pertaining to the change specified
const checkboxEvent = (cb, fx) => {
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


/**
 * Creates a line through two points with properly formatted equation
 * @param {JXG.Point} A - First point
 * @param {JXG.Point} B - Second point
 * @param {Object} options - JSXGraph line options
 * @returns {Object} An object containing the line and its equation element
 */
function createLineWithEquation(board, A, B, options, onUpdateCallback) {
  // Default options merged with user options
  const lineOptions = Object.assign({
    strokeColor: '#000000',
    strokeWidth: 2,
    highlightStrokeColor: '#FF0000',
    highlightStrokeWidth: 3,
    label: { autoPosition: true }
  }, options || {});

  // Create the line
  const line = board.create('line', [A, B], lineOptions);

  // Calculate the coefficients for ax + by + c = 0
  const x1 = A.X(), y1 = A.Y();
  const x2 = B.X(), y2 = B.Y();

  // Calculate the coefficients
  let a = y1 - y2;
  let b = x2 - x1;
  let c = x1 * y2 - x2 * y1;

  // Compute the greatest common divisor using Euclidean algorithm
  const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const gcd3 = (a, b, c) => {
    return gcd(gcd(a, b), c);
  };

  const commonDivisor = gcd3(a, b, c);

  // Simplify coefficients by dividing by GCD
  a = a / commonDivisor;
  b = b / commonDivisor;
  c = c / commonDivisor;

  // Ensure the leading coefficient is positive
  if (a < 0 || (a === 0 && b < 0)) {
    a = -a;
    b = -b;
    c = -c;
  }

  // Format the equation string
  let equationStr = '';

  // Handle 'a' coefficient
  if (a !== 0) {
    if (a === 1) equationStr += 'x';
    else if (a === -1) equationStr += '-x';
    else equationStr += a + 'x';
  }

  // Handle 'b' coefficient
  if (b !== 0) {
    let bPart = '';
    if (b === 1) bPart = '+y';
    else if (b === -1) bPart = '-y';
    else bPart = (b > 0 ? '+' : '') + b + 'y';

    // Special case when a is 0
    if (a === 0) bPart = bPart.replace(/^\+/, '');
    equationStr += bPart;
  }

  // Handle 'c' coefficient
  if (c !== 0 || (a === 0 && b === 0)) {
    equationStr += (c > 0 ? '+' : '') + c;
  }

  // Add the =0 part
  equationStr += '=0';

  // Clean up any remaining +- or double signs
  equationStr = equationStr.replace(/\+\-/g, '-').replace(/\-\-/g, '+');

  // Create the equation label with proper MathJax formatting
  const equation = board.create('text', [
    function () { return A.X() + (B.X() - A.X()) * 0.1; },
    function () { return A.Y() + (B.Y() - A.Y()) * 0.1; },
    '$$' + equationStr + '$$'
  ], {
    anchorX: 'left',
    anchorY: 'bottom',
    fontSize: 16,
    useMathJax: true,
    parse: false
  });

  // Function to update equation when points are dragged
  const updateEquation = () => {
    const x1 = A.X(), y1 = A.Y();
    const x2 = B.X(), y2 = B.Y();

    let a = y1 - y2;
    let b = x2 - x1;
    let c = x1 * y2 - x2 * y1;

    // GCD calculation
    const gcd = (a, b) => {
      a = Math.abs(a);
      b = Math.abs(b);
      while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
      }
      return a;
    };

    const gcd3 = (a, b, c) => gcd(gcd(a, b), c);
    const commonDivisor = gcd3(a, b, c);

    a = a / commonDivisor;
    b = b / commonDivisor;
    c = c / commonDivisor;

    if (a < 0 || (a === 0 && b < 0)) {
      a = -a;
      b = -b;
      c = -c;
    }

    let equationStr = '';
    if (a !== 0) {
      if (a === 1) equationStr += 'x';
      else if (a === -1) equationStr += '-x';
      else equationStr += a + 'x';
    }
    if (b !== 0) {
      let bPart = '';
      if (b === 1) bPart = '+y';
      else if (b === -1) bPart = '-y';
      else bPart = (b > 0 ? '+' : '') + b + 'y';
      if (a === 0) bPart = bPart.replace(/^\+/, '');
      equationStr += bPart;
    }
    if (c !== 0 || (a === 0 && b === 0)) {
      equationStr += (c > 0 ? '+' : '') + c;
    }
    equationStr += '=0';
    equationStr = equationStr.replace(/\+\-/g, '-').replace(/\-\-/g, '+');

    equation.setText('$$' + equationStr + '$$');

    // Update stored values
    result.coefficients = { a: a, b: b, c: c };
    result.equationText = equationStr;

    // Call external callback if provided
    if (onUpdateCallback && typeof onUpdateCallback === 'function') {
      onUpdateCallback({ a: a, b: b, c: c, equationText: equationStr });
    }

    return { a: a, b: b, c: c, equationText: equationStr };
  };

  // Set up update listener
  board.on('update', updateEquation);

  const result = {
    line: line,
    equation: equation,
    coefficients: { a: a, b: b, c: c },
    equationText: equationStr,
    updateEquation: updateEquation,
    getCoefficients: () => result.coefficients,
    getEquationText: () => result.equationText
  };

  return result;
}

/**
 * Creates a MathJax label showing point coordinates
 * @param {JXG.Board} board - The JSXGraph board
 * @param {JXG.Point} P - The point to label
 * @param {Object} options - Styling options for the label
 * @returns {Object} An object containing the label element
 */
function labelPoint(board, P, options) {
  // Default options merged with user options
  const labelOptions = Object.assign({
    fontSize: 14,
    anchorX: 'left',
    anchorY: 'bottom',
    offset: [0.1, 0.1],  // Default offset of 0.1 units in each direction
    useMathJax: true,
    parse: false
  }, options || {});

  // Calculate offset relative to board coordinate system
  const boardWidth = board.getBoundingBox()[2] - board.getBoundingBox()[0];
  const boardHeight = board.getBoundingBox()[1] - board.getBoundingBox()[3];
  const xOffset = labelOptions.offset[0] * boardWidth * 0.01; // 1% of board width
  const yOffset = labelOptions.offset[1] * boardHeight * 0.01; // 1% of board height

  // Create the coordinate label with MathJax formatting
  const label = board.create('text', [
    function () { return P.X() + xOffset; },
    function () { return P.Y() + yOffset; },
    `$$(${P.X()}, ${P.Y()})$$`
  ], labelOptions);

  // Function to update label when point moves
  const updateLabel = () => {
    label.setText(`$$(${P.X()}, ${P.Y()})$$`);
  };

  // Set up update listener
  board.on('update', updateLabel);

  const result = {
    label: label,
    updateLabel: updateLabel,
    getCoordinates: () => ({ x: P.X(), y: P.Y() })
  };

  return result;
}
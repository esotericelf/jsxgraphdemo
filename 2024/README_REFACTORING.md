# 2024_II_17 Refactoring Documentation

## Overview
The repetitive code in the 2024_II_17_X files has been refactored to use a centralized setup system. This reduces code duplication and makes it easier to create new variations.

## File Structure

### `script.js` (Global)
Contains all the general-purpose JSXGraph utility functions that can be reused across different problems.

### `2024_II_17_utils.js` (Specific)
Contains functions specific to the 2024_II_17 problem series:
- `createBaseSquare2024_II_17()`
- `setup2024_II_17()`
- `createTextElements()`
- `createSegmentLabels()`
- `createAdditionalPolygons()`

## New Functions in 2024_II_17_utils.js

### 1. `createBaseSquare2024_II_17(options)`
Creates the base square setup with all common elements:
- Square points A, B, C, D
- Square sides AB, BC, CD, DA
- Midpoint M of BC
- Point E dividing AD in 3:1 ratio
- Point F at distance AE from M
- Segments AM, EF, BF
- Intersection points G and H
- Base triangle BHM

**Parameters:**
- `options.boundingbox` (default: [-2, 10, 14, -2])
- `options.squareSize` (default: 8)
- `options.squareX` (default: 0)
- `options.squareY` (default: 0)

### 2. `setup2024_II_17(config)`
Complete setup function that creates the base square and handles all customizations.

**Parameters:**
- `config.baseOptions` - Options for base square
- `config.baseTriangleText` - Configuration for the base triangle text
- `config.texts` - Array of additional text configurations
- `config.segmentLabels` - Array of segment label configurations
- `config.additionalPolygons` - Array of additional polygon configurations

## How to Create New 2024_II_17_X Files

### Step 1: Create HTML File
Copy `template_2024_II_17.html` and replace `SCRIPT_FILE_PLACEHOLDER` with your JS file name.

**Required Scripts (in order):**
1. `../script.js` - Global utility functions
2. `2024_II_17_utils.js` - 2024_II_17 specific functions
3. Your specific JS file

### Step 2: Create JS File
Use the `setup2024_II_17()` function as the base and add your customizations:

```javascript
// Basic setup
const elements = setup2024_II_17({
    baseTriangleText: {
        x: -0.5,
        y: 1.5,
        content: '4cm^2'
    }
});

// Add your custom elements
const customText = createText(x, y, 'text', 12, true);
const customPolygon = createPolygon([points], { attributes });
```

## Examples

### Simple Version (like 2024_II_17_1)
```javascript
const elements = setup2024_II_17({
    baseTriangleText: {
        x: -0.5,
        y: 1.5,
        content: '4cm^2'
    }
});
```

### Version with Additional Elements (like 2024_II_17_4)
```javascript
const elements = setup2024_II_17({
    baseTriangleText: {
        x: -0.5,
        y: 1.5,
        content: '4cm^2'
    }
});

// Add segment labels
const BM_s = segmentLabel(elements.points.M, elements.points.H, 0.5, false, false, 0);

// Add text elements
const txt2 = createText(
    () => elements.points.M.X() + 0.2,
    () => (elements.points.H.Y() + elements.points.M.Y()) / 2 + 0.2,
    '2',
    12,
    true
);

// Add additional polygons
const trapezium = createPolygon([elements.points.H, elements.points.M, elements.points.F, elements.points.G], {
    fillColor: '#305FB3',
    fillOpacity: 0.6
});
```

## Benefits of Refactoring

1. **Reduced Code Duplication**: ~80% reduction in repetitive code
2. **Easier Maintenance**: Changes to base structure only need to be made in one place
3. **Consistent Structure**: All files follow the same pattern
4. **Faster Development**: New variations can be created quickly
5. **Better Organization**: Clear separation between global and specific functions
6. **Modular Design**: 2024_II_17 specific functions are isolated from global utilities

## Available Points and Elements

After calling `setup2024_II_17()`, you have access to:

**Points:**
- `elements.points.A`, `elements.points.B`, `elements.points.C`, `elements.points.D`
- `elements.points.M`, `elements.points.E`, `elements.points.F`
- `elements.points.G`, `elements.points.H`

**Segments:**
- `elements.segments.AB`, `elements.segments.BC`, `elements.segments.CD`, `elements.segments.DA`
- `elements.segments.AM`, `elements.segments.EF`, `elements.segments.BF`, `elements.segments.BG`

**Base Elements:**
- `elements.triangle` - The base triangle BHM
- `elements.baseTriangleTextElement` - The text element for the base triangle area

## File Dependencies

```
HTML File
├── script.js (global utilities)
├── 2024_II_17_utils.js (specific utilities)
└── 2024_II_17_X.js (your specific code)
```
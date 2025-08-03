#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the version number from command line argument
const version = process.argv[2];

if (!version) {
    console.log('Usage: node generate_new_file.js <version_number>');
    console.log('Example: node generate_new_file.js 8');
    process.exit(1);
}

const htmlTemplate = `<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>2024 II 17</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraph.css">
    <style>
        #box {
            width: 300px;
            height: 300px;
            margin: 20px auto;
            border: 1px solid #ccc;
        }
    </style>
</head>

<body>
    <div id="box" style="border: none;"></div>

    <script src="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <script src="../script.js"></script>
    <script src="2024_II_17_utils.js"></script>
    <script src="2024_II_17_${version}.js"></script>
</body>

</html>`;

const jsTemplate = `// Refactored version using the new setup function
const elements = setup2024_II_17({
    baseTriangleText: {
        x: -0.5,
        y: 1.5,
        content: '4cm^2'
    }
});

// Add your custom elements here
// Example:
// const customText = createText(x, y, 'text', 12, true);
// const customPolygon = createPolygon([elements.points.A, elements.points.B, elements.points.C], {
//     fillColor: '#F54927',
//     fillOpacity: 0.6
// });
`;

// Create the files
const htmlFileName = `2024_II_17_${version}.html`;
const jsFileName = `2024_II_17_${version}.js`;

try {
    fs.writeFileSync(htmlFileName, htmlTemplate);
    fs.writeFileSync(jsFileName, jsTemplate);

    console.log(`✅ Created ${htmlFileName}`);
    console.log(`✅ Created ${jsFileName}`);
    console.log('\n📝 Next steps:');
    console.log('1. Open the HTML file in your browser to test');
    console.log('2. Modify the JS file to add your custom elements');
    console.log('3. Use elements.points.A, elements.points.B, etc. to access the base points');
    console.log('4. Use createText(), createPolygon(), segmentLabel() for custom elements');

} catch (error) {
    console.error('❌ Error creating files:', error.message);
    process.exit(1);
}
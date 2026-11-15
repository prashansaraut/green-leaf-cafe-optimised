// Build step: minify CSS/JS/HTML into dist/ and inline the critical CSS.
const fs = require('fs'), path = require('path');
const csso = require('csso'), { minify: terser } = require('terser'), { minify: html } = require('html-minifier-terser');
(async () => {
  const d = 'dist'; fs.rmSync(d, { recursive: true, force: true });
  fs.mkdirSync(d + '/css', { recursive: true }); fs.mkdirSync(d + '/js', { recursive: true });
  fs.cpSync('assets', d + '/assets', { recursive: true });
  const critical = csso.minify(fs.readFileSync('css/critical.css', 'utf8')).css;
  fs.writeFileSync(d + '/css/styles.min.css', csso.minify(fs.readFileSync('css/styles.css', 'utf8')).css);
  fs.writeFileSync(d + '/js/app.min.js', (await terser(fs.readFileSync('js/app.js', 'utf8'), { compress: true, mangle: true })).code);
  let page = fs.readFileSync('index.html', 'utf8')
    .replace('<link rel="stylesheet" href="css/critical.css">', '<style>' + critical + '</style>')
    .replace('<link rel="stylesheet" href="css/styles.css">',
      '<link rel="preload" href="css/styles.min.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">\n<noscript><link rel="stylesheet" href="css/styles.min.css"></noscript>')
    .replace('js/app.js', 'js/app.min.js');
  fs.writeFileSync(d + '/index.html', await html(page, { collapseWhitespace: true, removeComments: true, minifyCSS: false }));
})();

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const projectDir = __dirname;

function getFileSize(filePath) {
  try {
    const fullPath = path.join(projectDir, filePath);
    const content = fs.readFileSync(fullPath);
    const originalSize = content.length;
    const gzipSize = zlib.gzipSync(content).length;
    return { file: filePath, originalSize, gzipSize };
  } catch (e) {
    return { file: filePath, originalSize: 'FILE NOT FOUND', gzipSize: 'N/A' };
  }
}

function getImageFiles(dir) {
  const fullDir = path.join(projectDir, dir);
  try {
    const files = fs.readdirSync(fullDir);
    return files.map(f => {
      const filePath = path.join(fullDir, f);
      const stats = fs.statSync(filePath);
      return { file: path.join(dir, f), size: stats.size };
    }).filter(f => !fs.statSync(path.join(projectDir, f.file)).isDirectory());
  } catch (e) {
    return [];
  }
}

// Individual file sizes
const textFiles = [
  'before/index.html',
  'before/style.css',
  'before/script.js',
  'index.html',
  'css/critical.css',
  'css/styles.css',
  'js/app.js',
  'dist/index.html',
  'dist/css/styles.min.css',
  'dist/js/app.min.js'
];

console.log('=== FILE SIZE ANALYSIS ===\n');
console.log('--- Individual File Sizes ---');
console.log('File | Original (bytes) | Gzip (bytes) | Gzip Savings');
console.log('--- | --- | --- | ---');

const results = textFiles.map(f => {
  const r = getFileSize(f);
  if (typeof r.originalSize === 'number') {
    const savings = ((1 - r.gzipSize / r.originalSize) * 100).toFixed(1);
    console.log(`${r.file} | ${r.originalSize} | ${r.gzipSize} | ${savings}%`);
  } else {
    console.log(`${r.file} | ${r.originalSize} | ${r.gzipSize} | N/A`);
  }
  return r;
});

// Totals for before/ page
const beforeFiles = results.filter(r => r.file.startsWith('before/'));
const beforeTotal = beforeFiles.reduce((acc, r) => typeof r.originalSize === 'number' ? acc + r.originalSize : acc, 0);
const beforeGzipTotal = beforeFiles.reduce((acc, r) => typeof r.gzipSize === 'number' ? acc + r.gzipSize : acc, 0);

// Totals for optimized page (index.html + css/ + js/)
const optimizedCodeFiles = results.filter(r => 
  r.file === 'index.html' || r.file.startsWith('css/') || r.file.startsWith('js/')
);
const optimizedTotal = optimizedCodeFiles.reduce((acc, r) => typeof r.originalSize === 'number' ? acc + r.originalSize : acc, 0);
const optimizedGzipTotal = optimizedCodeFiles.reduce((acc, r) => typeof r.gzipSize === 'number' ? acc + r.gzipSize : acc, 0);

// Totals for dist/ page
const distFiles = results.filter(r => r.file.startsWith('dist/'));
const distTotal = distFiles.reduce((acc, r) => typeof r.originalSize === 'number' ? acc + r.originalSize : acc, 0);
const distGzipTotal = distFiles.reduce((acc, r) => typeof r.gzipSize === 'number' ? acc + r.gzipSize : acc, 0);

console.log('\n--- Page Totals (HTML + CSS + JS only) ---');
console.log(`before/ page: ${beforeTotal} bytes (gzip: ${beforeGzipTotal} bytes)`);
console.log(`optimized page (index.html + css/ + js/): ${optimizedTotal} bytes (gzip: ${optimizedGzipTotal} bytes)`);
console.log(`dist/ page: ${distTotal} bytes (gzip: ${distGzipTotal} bytes)`);

// Image files
console.log('\n--- Image Files: before/img/ ---');
const beforeImages = getImageFiles('before/img');
let beforeImgTotal = 0;
beforeImages.forEach(f => {
  console.log(`${f.file} | ${f.size} bytes (${(f.size / 1024).toFixed(1)} KB)`);
  beforeImgTotal += f.size;
});
console.log(`Total before/img/: ${beforeImgTotal} bytes (${(beforeImgTotal / 1024 / 1024).toFixed(2)} MB)`);

console.log('\n--- Image Files: assets/img/ ---');
const assetsImages = getImageFiles('assets/img');
let assetsImgTotal = 0;
assetsImages.forEach(f => {
  console.log(`${f.file} | ${f.size} bytes (${(f.size / 1024).toFixed(1)} KB)`);
  assetsImgTotal += f.size;
});
console.log(`Total assets/img/: ${assetsImgTotal} bytes (${(assetsImgTotal / 1024).toFixed(1)} KB)`);

console.log('\n--- Image Size Reduction ---');
console.log(`before/img/ total: ${beforeImgTotal} bytes (${(beforeImgTotal / 1024 / 1024).toFixed(2)} MB)`);
console.log(`assets/img/ total: ${assetsImgTotal} bytes (${(assetsImgTotal / 1024).toFixed(1)} KB)`);
console.log(`Reduction: ${((1 - assetsImgTotal / beforeImgTotal) * 100).toFixed(1)}%`);

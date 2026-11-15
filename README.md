# Green Leaf Cafe: Week 4 (Performance and Accessibility)

- `index.html`, `css/`, `js/`, `assets/`: readable, optimised source
- `dist/`: production build (minified, critical CSS inlined). Open `dist/index.html`
- `before/`: unoptimised baseline used for comparison
- Rebuild: `npm i csso terser html-minifier-terser && node build.js`
- Test: run Lighthouse, WAVE and axe on `before/index.html` and `dist/index.html`

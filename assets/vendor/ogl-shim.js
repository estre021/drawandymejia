// Load OGL ESM from unpkg and expose as window.ogl
(async () => {
  try {
    const ogl = await import('https://unpkg.com/ogl@1.0.11/src/index.js');
    window.ogl = ogl;
    window.OGL = ogl;
    console.log('OGL loaded successfully as window.ogl');
  } catch (err) {
    console.warn('Failed to load OGL:', err);
  }
})();

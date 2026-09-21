// Vanilla JavaScript PixelSwap animation - no React needed
class PixelSwapAnimator {
  constructor(container, options = {}) {
    this.container = container;
    this.pixelSize = options.pixelSize || 32;
    this.pixelColor = options.pixelColor || '#d4788c';
    this.duration = options.duration || 1200;
    this.pixelDuration = options.pixelDuration || 300;
    this.pattern = options.pattern || 'center';
    
    this.grid = { rows: 0, columns: 0 };
    this.pixels = [];
    this.isAnimating = false;
    this.animationTimeouts = [];
    
    this.init();
  }

  init() {
    // Ensure container is positioned
    if (this.container.style.position === '' || this.container.style.position === 'static') {
      this.container.style.position = 'relative';
    }
    if (this.container.style.overflow === '') {
      this.container.style.overflow = 'hidden';
    }
    
    // Setup hover listener
    this.container.addEventListener('mouseenter', () => this.animate());
    
    // Calculate initial grid
    setTimeout(() => this.calculateGrid(), 100);
    
    // Setup resize observer to recalculate grid
    this.setupResizeObserver();
    
    console.log('PixelSwap initialized for:', this.container);
  }

  setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        this.calculateGrid();
      });
      observer.observe(this.container);
    }
  }

  calculateGrid() {
    const rect = this.container.getBoundingClientRect();
    const width = rect.width || this.container.offsetWidth;
    const height = rect.height || this.container.offsetHeight;
    
    if (!width || !height) {
      console.warn('Container has no dimensions', this.container);
      return;
    }
    
    this.grid.rows = Math.ceil(height / this.pixelSize);
    this.grid.columns = Math.ceil(width / this.pixelSize);
    console.log('Grid calculated:', this.grid);
  }

  makePixels() {
    const pixels = [];
    const { rows, columns } = this.grid;
    
    if (rows === 0 || columns === 0) return pixels;
    
    for (let i = 0; i < rows * columns; i++) {
      const row = Math.floor(i / columns);
      const column = i % columns;
      const x = columns <= 1 ? 0 : column / (columns - 1);
      const y = rows <= 1 ? 0 : row / (rows - 1);
      
      let order;
      if (this.pattern === 'center') {
        const centerDistance = Math.hypot(x - 0.5, y - 0.5) / Math.SQRT1_2;
        order = centerDistance;
      } else if (this.pattern === 'edges') {
        const edgeDistance = Math.min(x, 1 - x, y, 1 - y) * 2;
        order = edgeDistance;
      } else {
        order = Math.random();
      }
      
      pixels.push({ id: i, order: order });
    }
    
    return pixels.sort((a, b) => a.order - b.order);
  }

  animate() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    // Recalculate grid before animating
    this.calculateGrid();
    
    const pixels = this.makePixels();
    
    if (pixels.length === 0) {
      console.warn('No pixels created');
      this.isAnimating = false;
      return;
    }
    
    // Remove old grid if exists
    const oldGrid = this.container.querySelector('.pixel-swap-grid');
    if (oldGrid) oldGrid.remove();
    
    // Create grid container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'pixel-swap-grid';
    gridContainer.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 20;
      display: grid;
      grid-template-columns: repeat(${this.grid.columns}, ${this.pixelSize}px);
      grid-template-rows: repeat(${this.grid.rows}, ${this.pixelSize}px);
      width: ${this.grid.columns * this.pixelSize}px;
      height: ${this.grid.rows * this.pixelSize}px;
    `;
    
    // Calculate container position
    const containerRect = this.container.getBoundingClientRect();
    const offsetX = containerRect.left;
    const offsetY = containerRect.top;
    
    gridContainer.style.left = offsetX + 'px';
    gridContainer.style.top = offsetY + 'px';
    
    // Create pixel elements
    pixels.forEach((pixel, index) => {
      const span = document.createElement('span');
      span.style.cssText = `
        background-color: ${this.pixelColor};
        opacity: 0;
        transform: scale(0.2);
        will-change: transform, opacity;
        min-width: 0;
        min-height: 0;
        display: block;
      `;
      
      gridContainer.appendChild(span);
      
      // Calculate delays
      const maxEnterDelay = this.duration * 0.3;
      const swapAt = this.duration * 0.5;
      const maxExitDelay = this.duration * 0.3;
      
      const enterDelay = pixel.order * maxEnterDelay;
      const exitDelay = swapAt + pixel.order * maxExitDelay;
      
      // Enter animation
      const enterKeyframes = [
        { opacity: '0', transform: 'scale(0.2)' },
        { opacity: '1', transform: 'scale(1.03)' }
      ];
      
      const enterOptions = {
        duration: this.pixelDuration,
        delay: enterDelay,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'both'
      };
      
      span.animate(enterKeyframes, enterOptions);
      
      // Exit animation
      const exitKeyframes = [
        { opacity: '1', transform: 'scale(1.03)' },
        { opacity: '0', transform: 'scale(0.15)' }
      ];
      
      const exitOptions = {
        duration: this.pixelDuration,
        delay: exitDelay,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards'
      };
      
      span.animate(exitKeyframes, exitOptions);
    });
    
    document.body.appendChild(gridContainer);
    
    // Remove grid after animation completes
    const timeout = setTimeout(() => {
      gridContainer.remove();
      this.isAnimating = false;
      this.animationTimeouts = this.animationTimeouts.filter(t => t !== timeout);
    }, this.duration + this.pixelDuration + 100);
    
    this.animationTimeouts.push(timeout);
    
    console.log('Animation started:', { pixels: pixels.length, duration: this.duration });
  }
}

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing PixelSwap...');
  
  const targets = document.querySelectorAll('.pixel-swap-target');
  console.log('Found targets:', targets.length);
  
  targets.forEach((target, index) => {
    const pixelSize = target.dataset.pixelsize ? Number(target.dataset.pixelsize) : 32;
    const pixelColor = target.dataset.pixelcolor || '#d4788c';
    const duration = target.dataset.duration ? Number(target.dataset.duration) : 1200;
    const pattern = target.dataset.pattern || 'center';
    
    console.log(`Target ${index}:`, { pixelSize, pixelColor, duration, pattern });
    
    new PixelSwapAnimator(target, {
      pixelSize: pixelSize,
      pixelColor: pixelColor,
      duration: duration,
      pattern: pattern
    });
  });
});

// Also try initialization after a short delay if DOM isn't ready
window.addEventListener('load', () => {
  setTimeout(() => {
    const targets = document.querySelectorAll('.pixel-swap-target');
    targets.forEach(target => {
      if (!target.__pixelSwapInitialized) {
        const pixelSize = target.dataset.pixelsize ? Number(target.dataset.pixelsize) : 32;
        const pixelColor = target.dataset.pixelcolor || '#d4788c';
        const duration = target.dataset.duration ? Number(target.dataset.duration) : 1200;
        const pattern = target.dataset.pattern || 'center';
        
        new PixelSwapAnimator(target, {
          pixelSize: pixelSize,
          pixelColor: pixelColor,
          duration: duration,
          pattern: pattern
        });
        target.__pixelSwapInitialized = true;
      }
    });
  }, 500);
});

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const makePixels = (rows, columns, pattern) =>
  Array.from({ length: rows * columns }, (_, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const x = columns <= 1 ? 0 : column / (columns - 1);
    const y = rows <= 1 ? 0 : row / (rows - 1);
    const centerDistance = Math.hypot(x - 0.5, y - 0.5) / Math.SQRT1_2;
    const edgeDistance = Math.min(x, 1 - x, y, 1 - y) * 2;
    const order =
      pattern === 'center'
        ? centerDistance
        : pattern === 'edges'
          ? edgeDistance
          : pattern === 'left-to-right'
            ? x
            : pattern === 'right-to-left'
              ? 1 - x
              : pattern === 'top-to-bottom'
                ? y
                : null;

    return {
      id: index,
      enter: order ?? ((index * 73 + index * index * 17) % 101) / 100,
      exit: order ?? ((index * 31 + index * index * 11) % 101) / 100
    };
  });

function PixelSwap({
  firstContent,
  secondContent,
  pixelSize = 32,
  pixelColor = '#d4788c',
  reversePixelColor,
  duration = 1200,
  pixelDuration = 400,
  pattern = 'center',
  easing = 'cubic-bezier(0.22, 1, 0.36, 1)',
  trigger = 'hover',
  initialActive = false,
  active,
  onActiveChange,
  aspectRatio = '100%',
  className = '',
  style
}) {
  const [internalActive, setInternalActive] = useState(initialActive);
  const [shownActive, setShownActive] = useState(active ?? initialActive);
  const [direction, setDirection] = useState(null);
  const [grid, setGrid] = useState({ rows: 8, columns: 13, cellSize: 32 });
  const containerRef = useRef(null);
  const pixelRefs = useRef([]);
  const animationsRef = useRef([]);
  const timerRefs = useRef([]);
  const desiredActive = active ?? internalActive;
  const size = Math.max(8, Math.round(pixelSize));
  const pixels = useMemo(() => makePixels(grid.rows, grid.columns, pattern), [grid, pattern]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateGrid = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      setGrid({ rows: Math.ceil(height / size), columns: Math.ceil(width / size), cellSize: size });
    };

    updateGrid();
    const observer = new ResizeObserver(updateGrid);
    observer.observe(container);
    return () => observer.disconnect();
  }, [size]);

  const clearTransition = useCallback(() => {
    animationsRef.current.forEach(animation => animation.cancel());
    timerRefs.current.forEach(timer => window.clearTimeout(timer));
    animationsRef.current = [];
    timerRefs.current = [];
  }, []);

  useEffect(() => clearTransition, [clearTransition]);

  useEffect(() => {
    if (direction !== null || desiredActive === shownActive) return;
    setDirection(desiredActive);
  }, [desiredActive, direction, shownActive]);

  useEffect(() => {
    if (direction === null) return;

    clearTransition();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setShownActive(direction);
      setDirection(null);
      return;
    }

    const total = Math.max(200, duration);
    const blockDuration = Math.min(Math.max(100, pixelDuration), total * 0.32);
    const swapAt = total * 0.64;
    const maxEnterDelay = Math.max(0, swapAt - blockDuration);
    const maxExitDelay = Math.max(0, total - swapAt - blockDuration);

    pixelRefs.current.forEach((pixel, index) => {
      if (!pixel) return;
      const data = pixels[index];
      pixel.style.backgroundColor = direction ? pixelColor : (reversePixelColor ?? pixelColor);
      const enterAnimation = pixel.animate(
        [
          { opacity: 0, transform: 'scale(0.2)' },
          { opacity: 1, transform: 'scale(1.03)' }
        ],
        { duration: blockDuration, delay: data.enter * maxEnterDelay, easing, fill: 'both' }
      );
      const exitAnimation = pixel.animate(
        [
          { opacity: 1, transform: 'scale(1.03)' },
          { opacity: 0, transform: 'scale(0.15)' }
        ],
        { duration: blockDuration, delay: swapAt + data.exit * maxExitDelay, easing, fill: 'forwards' }
      );
      animationsRef.current.push(enterAnimation, exitAnimation);
    });

    timerRefs.current.push(
      window.setTimeout(() => setShownActive(direction), swapAt),
      window.setTimeout(() => {
        clearTransition();
        setDirection(null);
      }, total)
    );
  }, [clearTransition, direction, duration, easing, pixelColor, pixelDuration, pixels, reversePixelColor]);

  const requestActive = next => {
    if (active === undefined) setInternalActive(next);
    onActiveChange?.(next);
  };

  const interactionProps =
    trigger === 'hover'
      ? {
          onMouseEnter: () => requestActive(true),
          onMouseLeave: () => requestActive(false),
          onFocus: () => requestActive(true),
          onBlur: () => requestActive(false),
          tabIndex: 0
        }
      : trigger === 'click'
        ? {
            onClick: () => requestActive(!desiredActive),
            onKeyDown: event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                requestActive(!desiredActive);
              }
            },
            role: 'button',
            tabIndex: 0
          }
        : {};

  return React.createElement(
    'div',
    {
      ref: containerRef,
      className: `pixel-swap ${className}`,
      style: { aspectRatio, ...style },
      'data-active': shownActive,
      'data-transitioning': direction !== null,
      ...interactionProps
    },
    React.createElement('div', { className: 'pixel-swap__content', 'aria-hidden': shownActive }, firstContent),
    React.createElement('div', { className: 'pixel-swap__content', 'aria-hidden': !shownActive }, secondContent),
    direction !== null &&
      React.createElement(
        'div',
        {
          className: 'pixel-swap__grid',
          style: {
            gridTemplateColumns: `repeat(${grid.columns}, ${grid.cellSize}px)`,
            gridTemplateRows: `repeat(${grid.rows}, ${grid.cellSize}px)`,
            width: grid.columns * grid.cellSize,
            height: grid.rows * grid.cellSize
          },
          'aria-hidden': 'true'
        },
        pixels.map((pixel, index) =>
          React.createElement('span', {
            key: pixel.id,
            ref: element => (pixelRefs.current[index] = element)
          })
        )
      )
  );
}

// Auto-initialize on elements with class `pixel-swap-target`
function initPixelSwapTargets() {
  if (typeof ReactDOM === 'undefined' || typeof React === 'undefined') return;
  const nodes = document.querySelectorAll('.pixel-swap-target');
  nodes.forEach((node) => {
    const pixelSize = node.dataset.pixelsize ? Number(node.dataset.pixelsize) : 32;
    const pixelColor = node.dataset.pixelcolor || '#d4788c';
    const duration = node.dataset.duration ? Number(node.dataset.duration) : 1200;
    const pattern = node.dataset.pattern || 'center';

    // Create simple placeholder content
    const emptyDiv = React.createElement('div', { style: { width: '100%', height: '100%' } });

    try {
      if (ReactDOM.createRoot) {
        const root = ReactDOM.createRoot(node);
        root.render(
          React.createElement(PixelSwap, {
            firstContent: emptyDiv,
            secondContent: emptyDiv,
            pixelSize: pixelSize,
            pixelColor: pixelColor,
            duration: duration,
            pixelDuration: 300,
            pattern: pattern,
            trigger: 'hover',
            initialActive: false
          })
        );
      } else {
        ReactDOM.render(
          React.createElement(PixelSwap, {
            firstContent: emptyDiv,
            secondContent: emptyDiv,
            pixelSize: pixelSize,
            pixelColor: pixelColor,
            duration: duration,
            pixelDuration: 300,
            pattern: pattern,
            trigger: 'hover',
            initialActive: false
          }),
          node
        );
      }
    } catch (err) {
      console.warn('PixelSwap render error', err);
    }
  });
}

// Wait for DOM ready and for React/ReactDOM to be available
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initPixelSwapTargets();
  }, 300);
});

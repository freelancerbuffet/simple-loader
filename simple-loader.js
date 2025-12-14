/**
 * SIMPLE LOADER - A lightweight, mobile-first loading component
 * @version 1.0.0
 * @license MIT
 */

class SimpleLoader {
  constructor(options = {}) {
    // Apply theme preset if specified
    if (options.theme) {
      options = this._applyTheme(options.theme, options);
    }

    this.config = {
      color: options.color || '#3498db',
      size: options.size || 'medium',
      type: options.type || 'spinner',
      overlay: options.overlay !== undefined ? options.overlay : true,
      overlayColor: options.overlayColor || 'rgba(0, 0, 0, 0.5)',
      speed: options.speed || 'normal',
      ariaLabel: options.ariaLabel || 'Loading...',
      className: options.className || '',
      customCSS: options.customCSS || {},
      container: options.container || document.body,
      theme: options.theme || null
    };

    this.element = null;
    this.overlay = null;
    this.isVisible = false;
    this.listeners = {};
    this.progressInterval = null;
    this.progress = 0;

    this._init();
  }

  _applyTheme(themeName, options) {
    const themes = {
      material: {
        color: '#2196F3',
        type: 'spinner',
        speed: 'normal',
        overlayColor: 'rgba(0, 0, 0, 0.6)'
      },
      ios: {
        color: '#007AFF',
        type: 'spinner',
        speed: 'fast',
        overlayColor: 'rgba(255, 255, 255, 0.9)'
      },
      minimal: {
        color: '#000000',
        type: 'dots',
        speed: 'slow',
        overlay: false
      },
      dark: {
        color: '#ffffff',
        type: 'pulse',
        speed: 'normal',
        overlayColor: 'rgba(0, 0, 0, 0.9)'
      },
      success: {
        color: '#4CAF50',
        type: 'pulse',
        speed: 'fast'
      },
      error: {
        color: '#F44336',
        type: 'heartbeat',
        speed: 'fast'
      },
      warning: {
        color: '#FF9800',
        type: 'wave',
        speed: 'normal'
      }
    };

    const theme = themes[themeName] || {};
    return { ...theme, ...options };
  }

  _init() {
    this._createElements();
    this._applyStyles();
  }

  _createElements() {
    // Create overlay
    if (this.config.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'simple-loader-overlay';
      this.overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${this.config.overlayColor};
        display: none;
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
    }

    // Create loader container
    this.element = document.createElement('div');
    this.element.className = `simple-loader simple-loader-${this.config.type} ${this.config.className}`;
    this.element.setAttribute('role', 'status');
    this.element.setAttribute('aria-label', this.config.ariaLabel);
    this.element.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: none;
      z-index: 9999;
    `;

    // Create loader content based on type
    this._createLoaderContent();
  }

  _createLoaderContent() {
    const content = document.createElement('div');
    content.className = 'simple-loader-content';

    switch (this.config.type) {
      case 'spinner':
        content.innerHTML = '<div class="spinner"></div>';
        break;
      case 'dots':
        content.innerHTML = `
          <div class="dots">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        `;
        break;
      case 'pulse':
        content.innerHTML = '<div class="pulse"></div>';
        break;
      case 'bar':
        content.innerHTML = '<div class="bar"><div class="bar-inner"></div></div>';
        break;
      case 'wave':
        content.innerHTML = '<div class="wave"><div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div></div>';
        break;
      case 'bounce':
        content.innerHTML = '<div class="bounce"></div>';
        break;
      case 'ring':
        content.innerHTML = '<div class="ring"></div>';
        break;
      case 'heartbeat':
        content.innerHTML = '<div class="heartbeat"></div>';
        break;
      case 'progress':
        content.innerHTML = '<div class="progress-container"><div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div><div class="progress-text">0%</div></div>';
        break;
      default:
        content.innerHTML = '<div class="spinner"></div>';
    }

    this.element.appendChild(content);
    
    // Initialize progress if type is progress
    if (this.config.type === 'progress') {
      this.progress = 0;
      this._startProgressAnimation();
    }
  }

  _startProgressAnimation() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    
    this.progressInterval = setInterval(() => {
      if (this.isVisible && this.config.type === 'progress') {
        this.progress = (this.progress + 1) % 101;
        this.setProgress(this.progress);
      }
    }, 50);
  }

  setProgress(percentage) {
    if (this.config.type !== 'progress') return;
    
    percentage = Math.max(0, Math.min(100, percentage));
    const fill = this.element.querySelector('.progress-fill');
    const text = this.element.querySelector('.progress-text');
    
    if (fill) fill.style.width = `${percentage}%`;
    if (text) text.textContent = `${Math.round(percentage)}%`;
  }

  _applyStyles() {
    const sizeMap = {
      small: 32,
      medium: 48,
      large: 64
    };

    const speedMap = {
      slow: '1.5s',
      normal: '1s',
      fast: '0.6s'
    };

    const size = typeof this.config.size === 'number' ? this.config.size : sizeMap[this.config.size];
    const speed = speedMap[this.config.speed];

    this.element.style.setProperty('--loader-color', this.config.color);
    this.element.style.setProperty('--loader-size', `${size}px`);
    this.element.style.setProperty('--loader-speed', speed);

    // Apply custom CSS
    Object.keys(this.config.customCSS).forEach(key => {
      this.element.style[key] = this.config.customCSS[key];
    });
  }

  show() {
    if (this.isVisible) return;

    // Append to container if not already in DOM
    if (!this.element.parentNode) {
      if (this.overlay) {
        this.config.container.appendChild(this.overlay);
      }
      this.config.container.appendChild(this.element);
    }

    // Show with animation
    requestAnimationFrame(() => {
      if (this.overlay) {
        this.overlay.style.display = 'block';
        requestAnimationFrame(() => {
          this.overlay.style.opacity = '1';
        });
      }
      this.element.style.display = 'block';
      this.isVisible = true;
      this._emit('show');
    });
  }

  hide() {
    if (!this.isVisible) return;

    if (this.overlay) {
      this.overlay.style.opacity = '0';
      setTimeout(() => {
        this.overlay.style.display = 'none';
      }, 300);
    }

    this.element.style.display = 'none';
    this.isVisible = false;
    this._emit('hide');
  }

  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  update(options) {
    Object.assign(this.config, options);

    // Remove old element
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }

    // Recreate
    this._init();

    // Show if was visible
    if (this.isVisible) {
      this.isVisible = false;
      this.show();
    }

    this._emit('update', this.config);
  }

  setColor(color) {
    this.config.color = color;
    this.element.style.setProperty('--loader-color', color);
  }

  setSize(size) {
    this.config.size = size;
    const sizeMap = { small: 32, medium: 48, large: 64 };
    const sizeValue = typeof size === 'number' ? size : sizeMap[size];
    this.element.style.setProperty('--loader-size', `${sizeValue}px`);
  }

  setSpeed(speed) {
    this.config.speed = speed;
    const speedMap = { slow: '1.5s', normal: '1s', fast: '0.6s' };
    this.element.style.setProperty('--loader-speed', speedMap[speed]);
  }

  destroy() {
    this.hide();
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    this.element = null;
    this.overlay = null;
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  _emit(event, data) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => callback(data));
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SimpleLoader;
}
if (typeof window !== 'undefined') {
  window.SimpleLoader = SimpleLoader;
}

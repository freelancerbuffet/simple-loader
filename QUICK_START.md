# Quick Start Guide

## 🚀 Get Started in 60 Seconds

### Step 1: Download Files
Copy these two files to your project:
- `simple-loader.js`
- `simple-loader.css`

### Step 2: Include in HTML
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="simple-loader.css">
</head>
<body>
  <!-- Your content -->
  
  <script src="simple-loader.js"></script>
</body>
</html>
```

### Step 3: Use It
```javascript
// Create a loader
const loader = new SimpleLoader({
  type: 'spinner',    // 9 types: 'spinner', 'dots', 'pulse', 'bar', 'wave', 'bounce', 'ring', 'heartbeat', 'progress'
  color: '#3498db',   // Any CSS color
  size: 'medium',     // 'small', 'medium', 'large', or number
  speed: 'normal'     // 'slow', 'normal', or 'fast'
});

// Or use a theme preset
const loader = new SimpleLoader({
  theme: 'material'   // 'material', 'ios', 'minimal', 'dark', 'success', 'error', 'warning'
});

// Show it
loader.show();

// Hide it when done
setTimeout(() => loader.hide(), 2000);
```

## 🎨 Common Use Cases

### Form Submission
```javascript
const loader = new SimpleLoader({ type: 'spinner' });

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  loader.show();
  
  try {
    await fetch('/api/submit', {
      method: 'POST',
      body: new FormData(e.target)
    });
    alert('Success!');
  } catch (error) {
    alert('Error!');
  } finally {
    loader.hide();
  }
});
```

### Page Load
```javascript
window.addEventListener('load', () => {
  const loader = new SimpleLoader({ type: 'pulse' });
  loader.show();
  
  // Hide after everything loads
  setTimeout(() => loader.hide(), 1000);
});
```

### AJAX Request
```javascript
const loader = new SimpleLoader({ type: 'dots', color: '#2ecc71' });

async function fetchData() {
  loader.show();
  
  const response = await fetch('/api/data');
  const data = await response.json();
  
  loader.hide();
  return data;
}
```

### File Upload
```javascript
const loader = new SimpleLoader({ 
  type: 'progress',  // Use progress type for uploads
  color: '#f39c12'
});

document.querySelector('#fileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  loader.show();
  
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    await fetch('/upload', {
      method: 'POST',
      body: formData
    });
    loader.setProgress(100); // Show completion
    setTimeout(() => loader.hide(), 500);
  } catch (error) {
    loader.hide();
  }
});
```

### Progress Tracking
```javascript
const loader = new SimpleLoader({ 
  type: 'progress',
  color: '#3498db'
});

loader.show();

// Manually update progress
let progress = 0;
const interval = setInterval(() => {
  progress += 10;
  loader.setProgress(progress);
  
  if (progress >= 100) {
    clearInterval(interval);
    setTimeout(() => loader.hide(), 500);
  }
}, 200);
```

## 🔧 Customization Examples

### Use Theme Presets
```javascript
// Success message
const successLoader = new SimpleLoader({ theme: 'success' });
successLoader.show();

// Error message
const errorLoader = new SimpleLoader({ theme: 'error' });

// Material Design
const materialLoader = new SimpleLoader({ theme: 'material' });

// iOS style
const iosLoader = new SimpleLoader({ theme: 'ios' });

// Minimal dark theme
const minimalLoader = new SimpleLoader({ theme: 'minimal' });
```

### Try New Loader Types
```javascript
// Wave animation
new SimpleLoader({ type: 'wave', color: '#9b59b6' });

// Bouncing ball
new SimpleLoader({ type: 'bounce', color: '#e67e22' });

// Dual rotating ring
new SimpleLoader({ type: 'ring', color: '#1abc9c' });

// Heartbeat effect
new SimpleLoader({ type: 'heartbeat', color: '#e91e63' });

// Progress with percentage
new SimpleLoader({ type: 'progress', color: '#3498db' });
```

### Change Colors
```javascript
const loader = new SimpleLoader({ color: '#e74c3c' });
loader.show();

// Change color dynamically
setTimeout(() => loader.setColor('#2ecc71'), 1000);
```

### Different Sizes
```javascript
// Small
new SimpleLoader({ size: 'small' });

// Medium (default)
new SimpleLoader({ size: 'medium' });

// Large
new SimpleLoader({ size: 'large' });

// Custom size in pixels
new SimpleLoader({ size: 60 });
```

### Without Overlay
```javascript
const loader = new SimpleLoader({
  overlay: false  // No background overlay
});
```

### Custom Overlay Color
```javascript
const loader = new SimpleLoader({
  overlay: true,
  overlayColor: 'rgba(255, 255, 255, 0.9)'  // White overlay
});
```

## 📚 All Options

```javascript
const loader = new SimpleLoader({
  // Visual
  type: 'spinner',              // Loader animation type
  color: '#3498db',             // Primary color
  size: 'medium',               // Size preset or pixel value
  
  // Behavior  
  overlay: true,                // Show background overlay
  overlayColor: 'rgba(0,0,0,0.5)',  // Overlay color
  speed: 'normal',              // Animation speed
  
  // Accessibility
  ariaLabel: 'Loading...',      // Screen reader label
  
  // Advanced
  className: 'my-loader',       // Additional CSS class
  customCSS: {},                // Inline styles object
  container: document.body      // Parent element
});
```

## 🎯 Methods

```javascript
loader.show()      // Display the loader
loader.hide()      // Hide the loader
loader.toggle()    // Toggle visibility

loader.setColor('#ff0000')   // Change color
loader.setSize('large')      // Change size
loader.setSpeed('fast')      // Change speed

loader.update({              // Update multiple options
  type: 'pulse',
  color: '#2ecc71'
})

loader.destroy()   // Remove and clean up
```

## 🎪 Events

```javascript
loader.on('show', () => {
  console.log('Loader is now visible');
});

loader.on('hide', () => {
  console.log('Loader is now hidden');
});

loader.on('update', (config) => {
  console.log('Loader updated:', config);
});
```

## 💡 Pro Tips

1. **Reuse Instances**: Create one loader and reuse it
   ```javascript
   const globalLoader = new SimpleLoader({ type: 'spinner' });
   // Use globalLoader.show() / hide() throughout your app
   ```

2. **Auto-hide**: Always hide loaders to prevent stuck states
   ```javascript
   try {
     loader.show();
     await someAsyncOperation();
   } finally {
     loader.hide();  // Always runs, even on error
   }
   ```

3. **Different Loaders**: Use different types for different actions
   ```javascript
   const saveLoader = new SimpleLoader({ type: 'spinner', color: 'blue' });
   const deleteLoader = new SimpleLoader({ type: 'pulse', color: 'red' });
   ```

4. **Match Your Brand**: Customize colors to match your design
   ```javascript
   const loader = new SimpleLoader({ 
     color: getComputedStyle(document.body).getPropertyValue('--primary-color')
   });
   ```

## 🌐 Browser Support

Works in all modern browsers:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS 12+, Android 5+)

## ❓ Need Help?

1. Check the main `README.md` for detailed documentation
2. View `index.html` for live examples
3. Explore `examples/` folder for more use cases
4. Open an issue on GitHub

---

**Happy Loading! 🚀**

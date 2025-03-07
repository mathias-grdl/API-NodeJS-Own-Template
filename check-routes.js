/**
 * This is a diagnostic script to check your Express routes.
 * Run this with: node check-routes.js
 */

import express from 'express';
import routes from './routes/index.js';

// Create a simple express app
const app = express();

// Attach the routes
app.use('/api', routes);

// List all registered routes
console.log('=== REGISTERED ROUTES ===');
function printRoutes(stack, basePath = '') {
  for (const layer of stack) {
    if (layer.route) {
      // Routes registered directly on the app
      const methods = Object.keys(layer.route.methods)
        .filter(method => layer.route.methods[method])
        .join(', ').toUpperCase();
      console.log(`${methods} ${basePath}${layer.route.path}`);
    } else if (layer.name === 'router' && layer.handle.stack) {
      // Router middleware
      let newBase = basePath;
      if (layer.regexp && layer.regexp.source !== '^\\/?(?=\\/|$)') {
        const match = layer.regexp.toString().match(/^\/\^\\\/\?(?:([^\/]*)|)\\\//);
        if (match && match[1]) {
          newBase += '/' + match[1].replace(/\\\//g, '/');
        }
      }
      printRoutes(layer.handle.stack, newBase);
    }
  }
}

printRoutes(app._router.stack);
console.log('========================');

console.log('\nCheck your server.js or app.js to ensure routes are mounted at: app.use(\'/api\', routes)');
console.log('If routes are mounted differently, update the test URLs accordingly.');

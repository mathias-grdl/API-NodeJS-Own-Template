import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import logger from './config/logger.js';
import setupMiddleware from './middleware/setupMiddleware.js';

// Initialize Express
const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 8443;

// Setup all middleware
setupMiddleware(app);

// Routes
app.use('/', routes);

// HTTPS Options
const httpsOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH || './private-key.pem'),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH || './certificate.pem'),
  minVersion: 'TLSv1.2',
  cipherSuites: [
    'TLS_AES_256_GCM_SHA384',
    'TLS_AES_128_GCM_SHA256',
    'TLS_CHACHA20_POLY1305_SHA256'
  ]
};

// Connect to database and start servers
connectDB().then(() => {
  logger.info('MongoDB connected...');
  
  // HTTP Server (can be used for redirects to HTTPS)
  http.createServer(app).listen(HTTP_PORT, () => {
    logger.info(`HTTP Server running on port ${HTTP_PORT}`);
  });
   
  // HTTPS Server
  https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    logger.info(`HTTPS Server running on port ${HTTPS_PORT}`);
  });
}).catch(err => {
  logger.error('Database connection failed', err);
});

// Add error handling middleware
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Something broke!');
});
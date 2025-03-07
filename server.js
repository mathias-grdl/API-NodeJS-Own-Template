import express from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';
import fs from 'fs';
import helmet from 'helmet';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';

// Initialize Express
const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 8443;

// Security middleware
app.use(helmet()); // Adds various security headers
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Redirect HTTP to HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Routes
app.use('/', routes);

// HTTPS Options
const httpsOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH || './private-key.pem'),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH || './certificate.pem'),
  // Add modern and secure TLS options
  minVersion: 'TLSv1.2',
  cipherSuites: [
    'TLS_AES_256_GCM_SHA384',
    'TLS_AES_128_GCM_SHA256',
    'TLS_CHACHA20_POLY1305_SHA256'
  ]
};

// Connect to database and start servers
connectDB().then(() => {
  console.log('MongoDB connected...');
  
  // HTTP Server (can be used for redirects to HTTPS)
  http.createServer(app).listen(HTTP_PORT, () => {
    console.log(`HTTP Server running on port ${HTTP_PORT}`);
  });
   
  // HTTPS Server
  https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running on port ${HTTPS_PORT}`);
  });
}).catch(err => {
  console.error('Database connection failed', err);
});
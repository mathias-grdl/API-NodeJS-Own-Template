import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { morganMiddleware } from '../config/logger.js';

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests—take a coffee break!'
});

const setupMiddleware = (app) => {
  // Logging middleware
  app.use(morganMiddleware);

  // Security middleware
  app.use(helmet());
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://yourdomain.com' : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
  app.use(limiter);

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // HTTPS redirect in production
  if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      if (!req.secure) {
        return res.redirect(`https://${req.headers.host}${req.url}`);
      }
      next();
    });
  }
};

export default setupMiddleware;

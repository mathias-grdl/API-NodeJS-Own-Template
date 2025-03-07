import pino from 'pino';
import morgan from 'morgan';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: 'yyyy-mm-dd HH:MM:ss',
    },
  },
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
});

// Create a stream for Morgan that uses Pino
const morganStream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

// Create Morgan middleware
const morganMiddleware = morgan('combined', { stream: morganStream });

export { logger as default, morganMiddleware };

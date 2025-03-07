# Node.js API Template

A comprehensive, production-ready Node.js API starter template with all the essential features for building secure and scalable RESTful APIs.

## Features

- **Modern JavaScript**: Uses ES Modules (ESM) syntax
- **Dual Server Support**: Runs both HTTP and HTTPS servers
- **MongoDB Integration**: Pre-configured MongoDB connection with Mongoose
- **Complete CRUD Example**: Working example routes for a sample resource
- **API Documentation**: Integrated Swagger/OpenAPI documentation
- **Security Features**:
  - HTTPS with TLS
  - Helmet security headers
  - CORS configuration
  - Rate limiting
  - Input validation
- **Logging**: Structured logging with Pino and HTTP request logging with Morgan
- **Development Ready**: Hot reloading with Nodemon

## Getting Started

### Prerequisites

- Node.js (v14+)
- pnpm (or npm/yarn)
- MongoDB account (or local MongoDB server)

### Installation

1. Clone this repository
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies
```bash
pnpm install
```

3. Configure environment variables
```bash
cp .env.exemple .env
```
Then edit the `.env` file with your configuration values.

4. Generate SSL certificates (for development)
```bash
openssl req -x509 -newkey rsa:2048 -keyout private-key.pem -out certificate.pem -days 365 -nodes
```

5. Start the server
```bash
pnpm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment (development/production) | development |
| HTTP_PORT | HTTP server port | 3000 |
| HTTPS_PORT | HTTPS server port | 8443 |
| MONGODB_USERNAME | MongoDB username | |
| MONGODB_PASSWORD | MongoDB password | |
| MONGODB_CLUSTER | MongoDB cluster address | |
| MONGODB_DATABASE | MongoDB database name | |
| SSL_CERT_PATH | Path to SSL certificate | ./certificate.pem |
| SSL_KEY_PATH | Path to SSL private key | ./private-key.pem |

## Project Structure

```
backend/
├── config/                     # Configuration files
│   ├── db.js                   # Database connection
│   ├── logger.js               # Logging configuration
│   ├── rateLimiter.js          # Rate limiting configuration
│   └── swagger.js              # API documentation setup
├── controllers/                # Request handlers
│   └── exempleController.js    # Example controller logic
├── middleware/                 # Express middleware
│   ├── errorHandler.js         # Global error handling
│   ├── requestLogger.js        # HTTP request logging
│   ├── securityHeaders.js      # Security related headers
│   ├── setupMiddleware.js      # Middleware configuration
│   └── validation.js           # Input validation functions
├── models/                     # Mongoose models
│   └── exempleModel.js         # Example data model
├── routes/                     # API routes
│   ├── index.js                # Main router
│   └── exemple/                # Feature-specific routes
│       ├── create.js           # Create operations
│       ├── read.js             # Read operations
│       ├── update.js           # Update operations
│       ├── delete.js           # Delete operations
│       └── index.js            # Route aggregation
├── test/                       # Test files
│   ├── test-rate-limit.js      # Rate limit testing script
│   └── api.test.js             # API endpoint tests
├── utils/                      # Utility functions
│   ├── asyncHandler.js         # Async error wrapper
│   └── responseFormatter.js    # Standardized responses
├── .env                        # Environment variables
├── .env.exemple                # Example environment variables
├── .gitignore                  # Git ignore file
├── index.http                  # Sample HTTP requests
├── certificate.pem             # SSL certificate
├── private-key.pem             # SSL private key
├── package.json                # Project dependencies
├── pnpm-lock.yaml              # Package lock file
├── server.js                   # Application entry point
└── README.md                   # Project documentation
```

## API Documentation

API documentation is available at: http://localhost:3000/api-docs

## Testing

The project includes sample HTTP requests in `index.http` that you can use with REST Client extensions in VS Code or other IDEs.

For rate limit testing:
```bash
node test/test-rate-limit.js
```

## Security

This template implements several security best practices:
- HTTPS with modern TLS configuration
- Security headers with Helmet
- CORS protection
- Rate limiting to prevent abuse
- Input validation with express-validator

## License

ISC

## Author

mathias

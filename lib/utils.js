import { ApiError } from './errors.js';

// Logger utility
export const logger = {
  info: (message, data = {}) => {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data);
  },
  error: (message, error = {}) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error);
  },
  warn: (message, data = {}) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data);
  },
  warning: (message, data = {}) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data);
  },
  debug: (message, data = {}) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, data);
    }
  }
};

// API Response utility
export const sendResponse = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

export const sendError = (res, error, statusCode = 500) => {
  const isOperational = error instanceof ApiError ? error.isOperational : false;
  const status = error instanceof ApiError ? error.statusCode : statusCode;
  
  // Log error
  logger.error('API Error:', {
    message: error.message,
    statusCode: status,
    stack: error.stack,
    isOperational
  });

  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production' && !isOperational 
    ? 'Something went wrong' 
    : error.message;

  return res.status(status).json({
    success: false,
    message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

// Async handler wrapper
export const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      sendError(res, error);
    }
  };
};

// Method validator
export const validateMethod = (req, res, allowedMethods) => {
  if (!allowedMethods.includes(req.method)) {
    res.setHeader('Allow', allowedMethods.join(', '));
    return sendError(res, new ApiError(`Method ${req.method} not allowed`, 405));
  }
  return true;
};
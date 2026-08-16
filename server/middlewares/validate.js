import { ValidationError, BadRequestError } from '../errors/index.js';

export function validateBody(requiredFields = []) {
  return (req, res, next) => {
    if (!req.body || typeof req.body !== 'object') {
      throw new BadRequestError('Request body must be a valid JSON object');
    }

    const missingFields = [];
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      throw new ValidationError(`Missing required field(s): ${missingFields.join(', ')}`, {
        missingFields
      });
    }

    next();
  };
}

export function validateParam(paramName) {
  return (req, res, next) => {
    const val = req.params[paramName];
    if (!val || typeof val !== 'string' || val.trim().length === 0) {
      throw new BadRequestError(`Invalid or missing route parameter: :${paramName}`);
    }
    next();
  };
}

'use strict'

const Joi = require('joi')

const userValidationSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'any.required': "First name should not be empty"
    }),
    lastName: Joi.string().required().messages({
        'any.required': "Last name should not be empty"
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required.',
        'string.email': 'Email must be a valid email address.',
        'string.empty': 'Email cannot be empty.'
    }),
    contact: Joi.string().length(10).pattern(/^\d+$/)
    .messages({
      'string.base': 'Contact number must be a string',
      'string.length': 'Contact number must be exactly 10 digits',
      'string.pattern.base': 'Contact number must contain only digits'
    })
})

// Add proper validation on payload/parameters and error handler for request.
module.exports.user = () => {
    return (req, res, next) => {
      const { error } = userValidationSchema.validate(req.body);
  
      if (error) {
        return res.status(403).json({ error: error.details[0].message });
      }
  
      next();
    };
  };
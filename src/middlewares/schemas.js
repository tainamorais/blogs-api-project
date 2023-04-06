const Joi = require('joi');

const createUserSchema = Joi.object({
  displayName: Joi.string().required().min(8).label('displayName'),
  email: Joi.string().required().email().label('email'),
  password: Joi.string().required().min(6).label('password'),
  image: Joi.string().label('image'),
}).messages({
  'any.required': '{{#label}} is required',
  'string.min': '{{#label}} length must be at least {{#limit}} characters long',
  'string.email': '{{#label}} must be a valid email',
});

module.exports = { createUserSchema };

// Tentando o uso do JOI no requisito 04

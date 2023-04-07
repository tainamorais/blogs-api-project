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

const loginSchema = Joi.object({
  email: Joi.string().required().email().label('email'),
  password: Joi.string().required().min(6).label('password'),
}).messages({
  'any.required': 'Some required fields are missing',
});

const createCategorySchema = Joi.object({
  name: Joi.string().required().min(1).label('name'),
}).messages({
  'any.required': '{{#label}} is required',
});

module.exports = { createUserSchema, loginSchema, createCategorySchema };

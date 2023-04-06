const schemas = require('./schemas');

const createUserValidator = ({ displayName, email, password, image }) => {
  const { error } = schemas.createUserSchema.validate({ displayName, email, password, image });

  if (error) {
    return { type: 'INVALID_VALUE', message: error.message };
  }

  return { type: null, message: '' };
};

module.exports = { createUserValidator };

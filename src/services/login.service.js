const { User } = require('../models');
const validator = require('../middlewares/validator');
const { tokenGenerator } = require('../utils/jwt');

// criei esse, pois schema não funcionou e não entendi o porquê
const isBodyValid = (email, password) => email && password;

module.exports = async (email, password) => {
  if (!isBodyValid(email, password)) {
    return { type: 'INVALID_VALUE', message: 'Some required fields are missing' };
  }

  const error = validator.loginValidator({ email, password });

  if (error.type) return error;

  const isEmailCreated = await User.findOne({ where: { email } });

  if (!isEmailCreated) {
    return { type: 'INVALID_VALUE', message: 'Invalid fields' };
  }

  const token = tokenGenerator(email);

  return ({ type: null, message: token });
};

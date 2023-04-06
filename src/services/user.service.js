const { User } = require('../models');
const validator = require('../middlewares/validator');
const { tokenGenerator } = require('../utils/jwt');

// Precisei criar para fazer os testes de get e post
const getAll = async () => {
  const users = await User.findAll();
  return users;
};

// não preciso passar adiante, função a ser usada em outras
const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const create = async (displayName, email, password, image) => {
  const error = validator.createUserValidator({ displayName, email, password, image });

  if (error.type) return error;

  const isEmailCreated = await User.findOne({ where: { email } });
  if (isEmailCreated) {
    return { type: 'EMAIL_REGISTERED', message: 'User already registered' };
  }

  const newUser = await User.create({ displayName, email, password, image });

  const token = tokenGenerator(newUser);

  return { type: null, message: token };

  // return ({ type: null, message: newUser });
};

/*
CAMINHO FELIZ
const create = async (displayName, email, password, image) => {
  await User.create({ displayName, email, password, image });
};

*/

module.exports = {
  getAll,
  getByEmail,
  create,
};

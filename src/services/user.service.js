const { User } = require('../models');
const validator = require('../middlewares/validator');
const { tokenGenerator } = require('../utils/jwt');

// Precisei criar para fazer os testes de get e post
/*
Função GET ALL sem excluir password
const getAll = async () => {
  const users = await User.findAll();
  return users;
};
*/

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

// não preciso passar adiante, função a ser usada em outras
const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) {
    return { type: 'NOT_FOUND', message: 'User does not exist' };
  }

  return { type: null, message: user };
};

const create = async (displayName, email, password, image) => {
  const error = validator.createUserValidator({ displayName, email, password, image });

  if (email.length < 1) {
    return { type: 'INVALID_VALUE', message: 'Some required fields are missing' };
  }

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
  getById,
  create,
};

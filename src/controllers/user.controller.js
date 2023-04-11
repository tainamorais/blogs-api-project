// const jwt = require('jsonwebtoken');

const errorMap = require('../utils/errorMap');

const UserService = require('../services/user.service');

// const secret = process.env.JWT_SECRET;

const getAll = async (_req, res) => {
  const users = await UserService.getAll();
  res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await UserService.getById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { type, message } = await UserService.create(displayName, email, password, image);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json({ token: message });
};

const remove = async (req, res) => {
  const user = await UserService.getByEmail(req.user.data);
  // console.log(user);
  
  // captura o id logado com token
  const userId = user.dataValues.id;
  // console.log(userId);

  const { type, message } = await UserService.remove(userId);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).end();
};

/*
Requisito 04: Estava seguindo course, fazendo jwt no controller, mas não é o ideal.
Mudei para o service e isolei o jwt em arquivo isolado.

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { type, message } = await UserService.create(displayName, email, password, image);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: email }, secret, jwtConfig);

  res.status(201).json({ token });
};
*/

module.exports = {
  getAll,
  getById,
  create,
  remove,
};

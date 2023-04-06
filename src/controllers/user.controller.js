// const jwt = require('jsonwebtoken');

const errorMap = require('../utils/errorMap');

const UserService = require('../services/user.service');

// const secret = process.env.JWT_SECRET;

const getAll = async (_req, res) => {
  const users = await UserService.getAll();
  res.status(200).json(users);
};

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { type, message } = await UserService.create(displayName, email, password, image);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json({ token: message });
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
  create,
};

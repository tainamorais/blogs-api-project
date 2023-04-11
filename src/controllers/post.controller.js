const PostService = require('../services/post.service');
const UserService = require('../services/user.service');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const categories = await PostService.getAll();
  res.status(200).json(categories);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await PostService.getById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

const remove = async (req, res) => {
  const { id } = req.params;

  // Verificar o que está chegando em req.user
  // Recuperar o id pelo e-mail que está chegando em req.user
  // console.log(req.user);
  const user = await UserService.getByEmail(req.user.data);

  // Verificar onde está o id do usuário dentro de data
  // console.log(user.dataValues);
  const userId = user.dataValues.id;

  const { type, message } = await PostService.remove(id, userId);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(204).end();
};

/*
FUNÇÃO CREATE AINDA EM DESENVOLVIMENTO - REQ. 12.
EM DETERMINADO PONTO DA FUNÇÃO CREATE, A FUNÇÃO REMOVE PASSA A FUNCIONAR, SEM AS VALIDAÇÕES.
REQ. 16 PASSA, POIS A FUNÇÃO POST FOI CRIADA, SEM VALIDAÇÕES.
VOU JOGAR NO GITHUB E CONTINUAR A DESENVOLVIMENTO DA FUNÇÃO POST - CREATE.
*/
const create = async (req, res) => {
  const { title, content } = req.body;

  const user = await UserService.getByEmail(req.user.data);
  // console.log(user);

  const userId = user.dataValues.id;
  // console.log(userId);
  
  const { message } = await PostService.create(title, content, userId);
  // const { type, message } = await PostService.create(title, content, userId);

  return res.status(201).json(message);
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
};
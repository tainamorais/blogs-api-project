const CategoryService = require('../services/category.service');
const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const categories = await CategoryService.getAll();
  res.status(200).json(categories);
};

const create = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await CategoryService.create(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  getAll,
  create,
};

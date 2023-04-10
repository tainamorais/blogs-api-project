const PostService = require('../services/post.service');
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

module.exports = {
  getAll,
  getById,
};
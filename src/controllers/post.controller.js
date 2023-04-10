const PostService = require('../services/post.service');
// const errorMap = require('../utils/errorMap');

const getAll = async (_req, res) => {
  const categories = await PostService.getAll();
  res.status(200).json(categories);
};

module.exports = {
  getAll,
};
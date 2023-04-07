const CategoryService = require('../services/category.service');

const getAll = async (_req, res) => {
  const categories = await CategoryService.getAll();
  res.status(200).json(categories);
};

module.exports = {
  getAll,
};

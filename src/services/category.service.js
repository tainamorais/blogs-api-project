const { Category } = require('../models');

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const create = async () => {};

module.exports = {
  getAll,
  create,
};

const { Category } = require('../models');
const validator = require('../middlewares/validator');

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

// CAMINHO FELIZ
// const create = async (name) => {
//   const category = await Category.create({ name });
//   return category;
// };

const create = async (name) => {
  const error = validator.createCategoryValidator({ name });

  if (error.type) return error;

  await Category.create({ name });

  const createdCategory = await Category.findOne({ where: { name } });

  return { type: null, message: createdCategory };
};

module.exports = {
  getAll,
  create,
};

const { BlogPost, User, Category } = require('../models');
// const validator = require('../middlewares/validator');

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });

  return posts;
};

module.exports = {
  getAll,
};

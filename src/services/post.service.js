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

/*
LISTA PELO ID NORMAL, SEM INCLUIR ATTRIBUTES
const getById = async (id) => {
  const post = await BlogPost.findByPk(id);

  if (!post) {
    return { type: 'NOT_FOUND', message: 'Post does not exist' };
  }

  return { type: null, message: post };
};
*/

// TESTANDO INCLUDE ATTRIBUTES
const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });

  if (!post) {
    return { type: 'NOT_FOUND', message: 'Post does not exist' };
  }

  return { type: null, message: post };
};

module.exports = {
  getAll,
  getById,
};

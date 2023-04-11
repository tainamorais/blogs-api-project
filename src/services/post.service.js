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

const remove = async (id, userId) => {
  // Recuperar o post através do id passado por parâmetro
  const userPost = await BlogPost.findByPk(id);

  if (!userPost) {
    return { type: 'NOT_FOUND', message: 'Post does not exist' };
  }

  // Através do post recuperado, em seu id, comparar se é o mesmo do userId
  if (userPost.userId !== userId) {
    return { type: 'NOT_AUTHORIZED', message: 'Unauthorized user' };
  }

  await BlogPost.destroy({ where: { id } });

  return { type: null, message: null };
};

const create = async (title, content, userId) => {
  // const posts = await BlogPost.findAll();

  await BlogPost.create({
    title,
    content,
    userId,
    updated: new Date(),
    published: new Date(),
  });

  const createdPost = await BlogPost
    .findOne({ where: { title }, attributes: { exclude: ['user_id'] } });

  return { type: null, message: createdPost };
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
};

const { BlogPost, User, Category } = require('../models');
const PostCategoryService = require('./postCategory.service');
const validator = require('../middlewares/validator');

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

const isBodyValid = (title, content, categoryIds) => title && content && categoryIds;
const missing = 'Some required fields are missing';
const notFound = 'one or more "categoryIds" not found';

const create = async (title, content, userId, categoryIds) => {
  // Mais uma vez o JOI não funcionou... Averiguar posteriormente o porquê!
  if (!isBodyValid(title, content, categoryIds)) return { type: 'INVALID_VALUE', message: missing };

  const error = validator.createPostValidator({ title, content, categoryIds });

  if (error.type) return error;

  // Pensando em como checar se uma categoria já foi cadastrada e comparar com um array.
  // SERÁ QUE UM MAP COM INCLUDES FUNCIONA??
  // Recuperar todas as categorias cadastradas (findAll). Só que chega em um array cheio de coisa...
  // Um map que recupera array com todos os ids em categorias
  const allCategoryIds = (await Category.findAll()).map((category) => category.dataValues.id);
  // console.log(allCategoryIds);

  // TESTANDO SE INCLUDES VAI FUNCIONAR. SÓ QUE PARA ISSO, TEM QUE SER TRUE PARA TUDO. USAR EVERY!!
  // Verificar se em todo array recuperado inclui os ids inseridos no POST
  // Se todos estiverem lá = TRUE, se um ou mais não tiver = FALSE
  const checkAllIds = categoryIds.every((id) => allCategoryIds.includes(id));
  // console.log(checkAllIds);

  if (!checkAllIds) return { type: 'INVALID_VALUE', message: notFound };

  // Apesar de default value em updates e published, nos meus testes no Thunder a hora estava errada, saía repetido para tudo... Tive que incluir a hora também na criação, só por desencargo...
  await BlogPost.create({ title,
    content,
    userId,
    updated: new Date(),
    published: new Date() });

  // Saindo 2 user id: um userId e outro user_id. O 2º não tem que retornar, por isso, excluí.
  const createdPost = await BlogPost
    .findOne({ where: { title }, attributes: { exclude: ['user_id'] } });
  
  // Função de CREATE postCategory para criar (popular) dados na tabela posts_categories. 
  PostCategoryService.create(categoryIds, createdPost.id);
  // console.log(postCategoryCreated);

  return { type: null, message: createdPost };
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
};

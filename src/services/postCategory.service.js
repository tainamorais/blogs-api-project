const { PostCategory } = require('../models');

// Essa função recebe um array de ids. Map que percorre e cria cada item de posts_categories.
const create = async (categoryIdsArray, postId) => {
  const postCategoryPromises = categoryIdsArray
    .map((categoryId) => PostCategory.create({ postId, categoryId }));

  const postCategoryResult = await Promise.all(postCategoryPromises);
  
  return postCategoryResult;
};

module.exports = { create };

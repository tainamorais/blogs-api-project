module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      postId: { allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'blog_posts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        field: 'post_id',
      },
      categoryId: { allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        field: 'category_id',
      },
    });
  },
  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('posts_categories'),
};

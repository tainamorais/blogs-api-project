module.exports = {
  up: (queryInterface, DataTypes) => queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: { allowNull: false, type: DataTypes.STRING },
      content: { allowNull: false, type: DataTypes.STRING },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
      },
      published: { type: DataTypes.DATE, defaultValue: new Date() },
      updated: { type: DataTypes.DATE, defaultValue: new Date() },
    }),

  down: (queryInterface) => queryInterface.dropTable('blog_posts'),
};

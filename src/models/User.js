// REQ. 02

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
'User', 
{
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
{ underscored: true, timestamps: false, tableName: 'users' },
);

User.associate = (models) => {
  User.hasMany(models.BlogPost, {
    foreignKey: 'user_id',
    as: 'blog_posts',
  });
};

  return User;
};

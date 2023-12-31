// REQ. 07

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
'Category', 
{
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
  },
{
    underscored: true,
    timestamps: false,
    tableName: 'categories',
  },
);

  return Category;
};

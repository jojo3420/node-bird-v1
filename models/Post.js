

const Post = (sequelize, DataTypes) => sequelize.define('post', {
  content: {
    type: DataTypes.STRING(140),
    allowNull: false,
  },
  // image path
  img: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
}, {
  timestamps: true,
  paranoid: true
});

module.exports = Post;



const User = (sequelize, DataTypes) => sequelize.define('user', {
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
  },
  nick: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  provider: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: sequelize.literal("'local'"),
  },
  snsId: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
}, {
  timestamps: true,
  paranoid: true
});

module.exports = User;

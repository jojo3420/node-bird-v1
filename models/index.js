const path = require('path');
const Sequelize = require('sequelize');


const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

const sequelize = new Sequelize(config.database,
  config.username, config.password, config);


const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;


// Register Model
db.User = require('./User')(sequelize, Sequelize);
db.Post = require('./Post')(sequelize, Sequelize);
db.Hashtag = require('./Hashtag')(sequelize, Sequelize);

// relationship
db.User.hasMany(db.Post, {
  foreignKey: 'userId', sourceKey: 'id',
});
db.Post.belongsTo(db.User, {
   foreignKey: 'userId', targetKey: 'id',
});

db.Post.belongsToMany(db.Hashtag,{ through: 'postHashtag'});
db.Hashtag.belongsToMany(db.Post, { through: 'postHashtag'});
//
db.User.belongsToMany(db.User, {
  foreignKey: 'followingId',
  as: 'Followers',
  through: 'follow',
});

db.User.belongsToMany(db.User, {
  foreignKey: 'followerId',
  as: 'Followings',
  through: 'follow'
});


module.exports = db;

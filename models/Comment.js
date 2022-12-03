const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Comment extends Model {}

Comment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: false, 
        defaultValue: DataTypes.NOW
    },
    posted_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'post',
            key: 'id'
        }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

module.exports = Comment;

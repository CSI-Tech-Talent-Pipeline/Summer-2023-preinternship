"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      this.belongsToMany(models.JobApplication, {
        through: "JobApplicationTag"
      })
    }
  }
  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Tag",
      tableName: "tags",
    }
  );
  return Tag;
};

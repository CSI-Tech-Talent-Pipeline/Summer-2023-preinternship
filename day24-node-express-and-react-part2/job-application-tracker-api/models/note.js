"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.JobApplication);
    }
  }
  Note.init(
    {
      content: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Content can't be blank",
            args: true
          }
        }
      },
      JobApplicationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "job_applications",
          key: "id",
        },
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Note",
      tableName: "notes"
    }
  );
  return Note;
};

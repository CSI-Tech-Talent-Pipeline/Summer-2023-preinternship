"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobApplicationTag extends Model {
    static associate(models) {
      // optional...
      // this.belongsTo(models.Tag);
      // this.belongsTo(models.JobApplication);
    }
  }
  JobApplicationTag.init(
    {
      JobApplicationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "job_applications",
          key: "id",
        },
        allowNull: false,
      },
      TagId: {
        type: DataTypes.INTEGER,
        references: {
          model: "tags",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "JobApplicationTag",
      tableName: "job_application_tags",
    }
  );
  return JobApplicationTag;
};

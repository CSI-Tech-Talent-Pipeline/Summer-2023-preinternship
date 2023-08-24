"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobApplicationTag extends Model {
    static associate(models) {
      this.belongsTo(models.JobApplication);
      this.belongsTo(models.Tag)
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
      },
      TagId: {
        type: DataTypes.INTEGER,
        references: {
          model: "tags",
          key: "id",
        },
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

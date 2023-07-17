"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JobApplication extends Model {
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsToMany(models.Tag, {
        through: "JobApplicationTag",
      });
    }
  }
  JobApplication.init(
    {
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      minSalary: DataTypes.INTEGER,
      maxSalary: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          minSalaryLessThanMax(value) {
            // console.log('this', this, 'minSalary', this.minSalary, 'maxSalary', value);
            // query the database to get the Job with this job's id
            // console.log("jobId", this.id); // don't have the id!!! Need to find a workaround
            if (this.minSalary && value && value < this.minSalary) {
              throw new Error("Max Salary cannot be less than Min Salary");
            }
          },
        },
      },
      location: DataTypes.STRING,
      postDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isPast(value) {
            if (value && value > new Date()) {
              throw new "Post Date cannot be in the future"();
            }
          },
        },
      },
      jobPostUrl: DataTypes.STRING,
      applicationDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isAfterPostDate(value) {
            if (this.postDate && value && value < this.postDate) {
              throw new Error(
                "Application date cannot be before the job post date"
              );
            }
          },
        },
      },
      lastContactDate: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
          isPast(value) {
            if (value && value > new Date()) {
              throw new Error("Last contact date cannot be in the future");
            }
          },
        },
      },
      companyContact: DataTypes.STRING,
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          isInt: true,
          isValidStatus(value) {
            if (!(1 <= value && value <= 6)) {
              throw new Error("Invalid Status, must be between 1 and 6");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "JobApplication",
      tableName: "job_applications",
    }
  );
  return JobApplication;
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "job_applications",
      [
        {
          company: "Aha!",
          title: "Ruby on Rails Engineer",
          minSalary: 100000,
          maxSalary: 160000,
          location: "Philadelphia, PA (Remote)",
          postDate: new Date("2023-06-17"),
          jobPostUrl: "https://www.linkedin.com/jobs/view/3638618757",
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          company: "Jobot",
          title: "Remote Front End Developer",
          minSalary: 120000,
          maxSalary: 200000,
          location: "Los Angeles, CA (Hybrid)",
          postDate: new Date("2023-06-24"),
          jobPostUrl: "https://www.linkedin.com/jobs/view/3643460386",
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          company: "Braintrust",
          title: "Software Engineer - Freelance (REMOTE)",
          minSalary: 50000,
          maxSalary: 90000,
          location: "New York, NY (Remote)",
          postDate: new Date("2023-06-20"),
          jobPostUrl: "https://www.linkedin.com/jobs/view/3641063402",
          status: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          company: "Underdog.io",
          title: "Frontend Engineer",
          minSalary: 88000,
          maxSalary: 192000,
          location: "New York, United States (On site)",
          postDate: new Date("2023-06-19"),
          jobPostUrl: "https://www.linkedin.com/jobs/view/3639725859",
          status: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("job_applications", null, {});
  },
};

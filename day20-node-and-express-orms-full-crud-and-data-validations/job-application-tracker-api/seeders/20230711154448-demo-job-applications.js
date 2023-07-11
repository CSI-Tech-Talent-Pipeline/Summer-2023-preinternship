'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "job_applications",
      [
        {
          company: "Aha!",
          title: "Ruby on Rails Engineer",
          min_salary: 100000,
          max_salary: 160000,
          location: "Philadelphia, PA (Remote)",
          post_date: new Date("2023-06-17"),
          job_post_url: "https://www.linkedin.com/jobs/view/3638618757",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          company: "Jobot",
          title: "Remote Front End Developer",
          min_salary: 120000,
          max_salary: 200000,
          location: "Los Angeles, CA (Hybrid)",
          post_date: new Date("2023-06-24"),
          job_post_url: "https://www.linkedin.com/jobs/view/3643460386",
          status: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          company: "Braintrust",
          title: "Software Engineer - Freelance (REMOTE)",
          min_salary: 50000,
          max_salary: 90000,
          location: "New York, NY (Remote)",
          post_date: new Date("2023-06-20"),
          job_post_url: "https://www.linkedin.com/jobs/view/3641063402",
          status: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          company: "Underdog.io",
          title: "Frontend Engineer",
          min_salary: 88000,
          max_salary: 192000,
          location: "New York, United States (On site)",
          post_date: new Date("2023-06-19"),
          job_post_url: "https://www.linkedin.com/jobs/view/3639725859",
          status: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('job_applications', null, {});
  }
};

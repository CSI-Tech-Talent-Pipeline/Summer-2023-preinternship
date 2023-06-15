const jobs = [
  {
    image: {
      src: "https://media.licdn.com/dms/image/C4E0BAQEiY07GSLZtFQ/company-logo_100_100/0/1539023176649?e=1694649600&v=beta&t=-vb-4kpBSDXQ36ou1Rk95RbdCiQO4kYGzGEFsnqhRg4",
      alt: "Aha! company logo",
    },
    company: "Aha!",
    title: "Ruby on Rails Engineer",
    salary: "$100k/yr - $160k/yr",
    location: "Chicago, IL (Remote)",
    postDate: "1 week ago",
  },
  {
    image: {
      src: "https://media.licdn.com/dms/image/C560BAQGiEbGtjE1o_w/company-logo_100_100/0/1523389063738?e=1694649600&v=beta&t=iWaF1nBxZfqNbg5mnkjkNWIbSAROTrqQrvpxDTEVUBk",
      alt: "Cal State Long Beach Logo",
    },
    company: "California State University, Long Beach",
    title: "Junior Software Developer",
    salary: "$3,713/m - $7,149/m",
    location: "Long Beach, CA (onsite)",
    postDate: "5 days ago",
  },
  {
    image: {
      src: "https://media.licdn.com/dms/image/C560BAQFSVDtroiTPVg/company-logo_100_100/0/1662729127883?e=1694649600&v=beta&t=z8CL4Gnp_srDR0UYgOE7nwIQKp10vghZDjQwm2CGGBE",
      alt: "Jobot company logo",
    },
    company: "Jobot",
    title: "Remote Wordpress Developer",
    salary: "$50/hr - $75/hr",
    location: "Malibu, CA (Hybrid)",
    postDate: "1 week ago",
  },
  {
    image: {
      src: "https://media.licdn.com/dms/image/C560BAQHbQYFSQsK__A/company-logo_100_100/0/1630511737707?e=1694649600&v=beta&t=Fa--go1eHlnSUYJLWyR07kb7Mfb5yp4upQyQUyUcBKQ",
      alt: "Braintrust Company Logo",
    },
    company: "Braintrust",
    title: "Software Engineer - Freelance (REMOTE)",
    salary: "$50/yr - $90/yr",
    location: "New York, NY (Remote)",
    postDate: "1 day ago",
  },
  {
    image: {
      src: "https://media.licdn.com/dms/image/C4D0BAQEq6OEw509HRQ/company-logo_100_100/0/1519952238666?e=1694649600&v=beta&t=Bv3329fHJDl0SMfrnUZ4stRoZnLrb0JfYI6u1hQbkZU",
      alt: "Underdog Company Logo",
    },
    company: "Underdog.io",
    title: "Frontend Engineer - Remote",
    salary: "$88k/yr - $192k/yr",
    location: "New York, United States (Remote)",
    postDate: "2 days ago",
  },
  {
    image: {
      src: "https://media.licdn.com/dms/image/C4E0BAQEiY07GSLZtFQ/company-logo_100_100/0/1539023176649?e=1694649600&v=beta&t=-vb-4kpBSDXQ36ou1Rk95RbdCiQO4kYGzGEFsnqhRg4",
      alt: "Aha! Company Logo",
    },
    company: "Aha!",
    title: "Lead Ruby on Rails Engineer",
    salary: "$120k/yr - $180k/yr",
    location: "Wichita, KS (Remote)",
    postDate: "6 days ago",
  },
];

const key = "title";

// console.log(jobs[0][key]);
// console.log(jobs[0].title);
// console.log(key[1])

// for (let i = 0; i < jobs.length; i++) {
//   console.log(jobs[i].title)
// }

// for (let i = 0; i < key.length; i++) {
//   console.log(key[i])
// }

// let jobLocationPreference = "Remote";

// console.log(jobLocationPreference)
// jobLocationPreference = "Los Angeles";
// console.log(jobLocationPreference)

// const compliments = [];
// console.log(compliments)
// compliments.push("You are very friendly!");
// console.log(compliments)

// checking truthiness / falsiness
// !!
// console.log(!!true); // true
// console.log(!!false); // false
// console.log(!!""); // false
// console.log(!!0); // false
// console.log(!!1); // true
// console.log(!![]); // true
// console.log(!!{}); // true
// console.log(!!"hello"); // true
// console.log(!!undefined); // false
// console.log(!!null); // false
// console.log(!!NaN); // false

// console.log(true + 2); // 3
// console.log(false + 2); // 2
// // type coercion is happening here: true => 1, false => 0
// console.log('1' + 2);
// console.log(2 + '1');

// // I want to print to the console:
// // The {company} company is hiring a {job title} and offering {salary}
// const firstJob = jobs[0];
// console.log(`The ${firstJob.company} company is hiring a ${firstJob.title} and offering ${firstJob.salary}`);

// using destructuring assignment

// const firstJob = jobs[0];
// const { company, title, salary } = firstJob;
// console.log(
//   `The ${company} company is hiring a ${title} and offering ${salary}`
// );

// const trip = ["Lancaster", "Lake Arrowhead"];
// const [from, to] = trip;
// console.log(from);
// console.log(to);


// function calculateAverageSalary(jobs) {
//   let totalSalary = 0;
//   for (let i = 0; i < jobs.length; i++) {
//     let salaryRange = jobs[i].salary.split(" - "); // Split the salary range into an array
//     let minSalary = parseInt(salaryRange[0].replace(/\D/g, "")); // Get the minimum salary as a number
//     let maxSalary = parseInt(salaryRange[1].replace(/\D/g, "")); // Get the maximum salary as a number
//     let averageSalary = (minSalary + maxSalary) / 2; // Calculate the average salary
//     totalSalary += averageSalary; // Add it to the total
//   }
//   return totalSalary / jobs.length; // Return the average salary across all jobs
// }

// console.log(`Average salary: ${calculateAverageSalary(jobs)}k`);
// we get problems because our salaries have different formats!

// let globalVar = "I am global!"; // This variable is globally scoped

// function checkScope() {
//   let localVar = "I am local!"; // This variable is locally scoped
//   console.log(globalVar); // We can access the global variable here
//   console.log(localVar); // And the local variable is also accessible
// }

// checkScope();
// console.log(globalVar);
// console.log(localVar);

jobs.forEach(job => console.log(job.title))
const jobTitles = jobs.map(job => job.title)
console.log(jobTitles);

const remoteJobs = jobs.filter(job => {
  return job.location.toLowerCase().includes("remote");
})
console.log(remoteJobs);

// filter in pseudocode
// function accepts callback as argument
// function is called on an original array
// create a new empty array for returning
// iterate over every element in the original array
// pass each element to the callback function as an argument
// check if the return value is truthy
// if it is add the element to the array for returning
// if not, leave it out
// when finished iterating through the original array
// return array for returning
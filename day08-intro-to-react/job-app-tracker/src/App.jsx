import "./App.css";
import JobCard from "./JobCard";
import jobs from "./jobs.js";

function App() {
  const jobCards = jobs.map((job, i) => {
    return <JobCard job={job} key={i} />;
  });

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>
      {jobCards}
    </div>
  );
}

export default App;

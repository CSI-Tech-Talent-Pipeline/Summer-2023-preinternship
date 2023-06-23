import JobCard from "./JobCard";
import jobs from "./jobs";
import "./App.css";

function App() {
  const jobCards = jobs.map((job, i) => {
    return <JobCard job={job} key={i} />;
  });

  return (
    <div className="mx-auto max-w-4xl">
      <h1>Job Application Tracker</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="h-56 bg-blue-500"></div>
        <div className="h-56 bg-blue-500"></div>
        <div className="h-56 bg-blue-500"></div>
        <div className="h-56 bg-blue-500"></div>
        <div className="h-56 bg-blue-500"></div>
        <div className="h-56 bg-blue-500"></div>
        <div className="h-56 bg-blue-500"></div>
        <div className="h-56 bg-blue-500"></div>
        <div className="h-56 bg-blue-500"></div>
        <div className="h-56 bg-blue-500"></div>
      </div>
      {jobCards}
      
    </div>
  );
}

export default App;

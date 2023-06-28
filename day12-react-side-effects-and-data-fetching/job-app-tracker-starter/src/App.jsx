import { useState, useEffect } from "react";
import classNames from "classnames";
import JobCard from "./JobCard";
import "./App.css";
import Modal from "./ui/Modal";
import AddJobForm from "./AddJobForm";

const statuses = {
  1: "Bookmarked",
  2: "Applying",
  3: "Applied",
  4: "Interviewing",
  5: "Negotiating",
  6: "Accepted",
};

function App() {
  const [jobs, setJobs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(1);

  useEffect(() => {
    async function fetchJobs() {
      const response = await fetch("http://localhost:3000/jobs"); // get response
      const jobs = await response.json(); // parse response body text (make it an array instead of a string)
      setJobs(jobs);
    }

    fetchJobs();
  }, [])

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        hideModal();
      }
    };
    console.log("adding event listener");
    window.addEventListener("keydown", handleEscape);
    return () => {
      console.log("removing event listener");
      window.removeEventListener("keydown", handleEscape);
    };
  }); 

  const filteredJobs = jobs.filter((job) => job.status === selectedStatus);

  const jobCards = filteredJobs.map((job, i) => {
    return <JobCard job={job} key={i} />;
  });

  const statusButtons = Object.keys(statuses).map((statusId) => {
    const buttonClass = classNames("px-4 py-2 border", {
      "bg-blue-500": selectedStatus === parseInt(statusId),
    });
    return (
      <button
        key={statusId}
        className={buttonClass}
        onClick={() => setSelectedStatus(parseInt(statusId))}
      >
        {statuses[statusId]}
      </button>
    );
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const onAddJob = (newJob) => {
    // modal should close
    hideModal();
    // new job should be added to the DOM
    setJobs((jobs) => {
      return [...jobs, newJob];
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1>Job Application Tracker</h1>
      <div className="grid grid-cols-6 my-4">{statusButtons}</div>
      <div className="flex justify-between">
        <div></div>
        <div>
          <button
            className="bg-blue-500 px-4 py-2 hover:bg-blue-600 transition"
            onClick={showModal}
          >
            + Add Job
          </button>
        </div>
      </div>

      {jobCards}
      <Modal isVisible={isModalVisible} hideModal={hideModal}>
        <AddJobForm onAddJob={onAddJob} />
      </Modal>
    </div>
  );
}

export default App;

import { PropTypes } from "prop-types";

function JobCard({ job }) {
  // pull data from argument
  const {
    image: { src, alt },
    company,
    title,
    salary,
    location,
    postDate,
  } = job;

  return (
    <div className="flex items-start gap-4 my-13">
      <img src={src} alt={alt} />
      <div>
        <h2 className="text-xl font-bold relative -top-1.5">{title}</h2>
        <p className="text-gray-400 italic mb-2">{company}</p>
        <ul className="text-sm">
          <li>{location}</li>
          <li>{salary}</li>
          <li>{postDate}</li>
        </ul>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  job: {
    image: {
      src: PropTypes.string,
      alt: PropTypes.string,
    },
    company: PropTypes.string,
    title: PropTypes.string,
    salary: PropTypes.string,
    location: PropTypes.string,
    postDate: PropTypes.string,
  },
};

export default JobCard;
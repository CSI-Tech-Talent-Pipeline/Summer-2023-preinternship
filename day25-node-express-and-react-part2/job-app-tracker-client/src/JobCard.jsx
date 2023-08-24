import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";

function JobCard({ job }) {
  // pull data from argument
  const {
    id,
    image,
    company,
    title,
    minSalary,
    maxSalary,
    location,
    postDate,
  } = job;

  return (
    <div
      data-testid="job-card"
      className="flex gap-4 my-9 justify-between items-start"
    >
      <div className="flex items-start gap-4">
        {image ? (
          <img src={image.src} alt={image.alt} />
        ) : (
          <img
            src="https://placehold.co/100x100"
            alt="No company logo available"
          />
        )}
        <div>
          <h2 className="text-xl font-bold relative -top-1.5" data-testid={id}>
            {title}
          </h2>
          <p className="text-gray-400 italic mb-2">{company}</p>
          <ul className="text-sm">
            <li>{location}</li>
            <li>{`$${minSalary} - $${maxSalary}`}</li>
            <li>{postDate}</li>
          </ul>
        </div>
      </div>
      <Link 
        to={`/jobs/${id}`}
        className="flex items-center gap-2 p-5 text-xl relative -top-6"
      >
        <BiDetail /> Details
      </Link>
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
    company: PropTypes.string,
    title: PropTypes.string,
    minSalary: PropTypes.number,
    maxSalary: PropTypes.number,
    location: PropTypes.string,
    postDate: PropTypes.string,
  }),
};

export default JobCard;

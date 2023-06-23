export default function JobCard({ job }) {
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
    <div className="j-desc">
      <img className="j-desc__company-image" src={src} alt={alt} />
      <div className="j-desc__details">
        <h2 className="j-desc__job-title">{title}</h2>
        <p className="j-desc__company">{company}</p>
        <ul className="j-desc__metadata">
          <li className="j-desc__location">{location}</li>
          <li className="j-desc__salary">{salary}</li>
          <li className="j-desc__posting_date">{postDate}</li>
        </ul>
      </div>
    </div>
  );
}


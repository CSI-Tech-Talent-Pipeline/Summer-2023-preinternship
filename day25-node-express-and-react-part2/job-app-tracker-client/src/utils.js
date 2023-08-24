export const statusTextById = {
  1: "Bookmarked",
  2: "Applying",
  3: "Applied",
  4: "Interviewing",
  5: "Negotiating",
  6: "Accepted",
};

export const statusIdByText = Object.keys(statusTextById).reduce((obj, id) => {
  obj[statusTextById[id]] = id;
  return obj;
}, {})

const mediumTime = new Intl.DateTimeFormat("en", {
  timeStyle: "medium",
  dateStyle: "short",
});

export const formatTime = (timeString) => {
  return mediumTime.format(new Date(timeString))
}
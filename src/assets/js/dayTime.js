export const getTimeAgo = (dateString) => {
  let date = new Date(dateString);
  let months = [" 1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let dayNumber = date.getUTCDate();
  let month = months[date.getUTCMonth()];
  let year = date.getUTCFullYear();
  let result = `${dayNumber} / ${month} /  ${year}`;
  return result;
};

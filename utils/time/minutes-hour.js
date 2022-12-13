const toHoursAndMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}`;
};

const padToTwoDigits = (num) => {
  return num.toString().padStart(2, "0");
};

module.exports = { toHoursAndMinutes, padToTwoDigits };

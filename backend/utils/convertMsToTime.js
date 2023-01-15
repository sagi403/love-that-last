export const convertMsToHours = ms => {
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return hours;
};

export const convertMsToMinutes = ms => {
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  return minutes;
};

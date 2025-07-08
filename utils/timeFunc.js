function calculateTotalTime(person) {
  if (!person || !person.start || !person.end) {
    return "Invalid input format";
  }

  // Convert seconds and nanoseconds to milliseconds
  function timeToMilliseconds(timeObj) {
    let milliseconds = (timeObj.seconds * 1000) + (timeObj.nanoseconds / 1e6);
    return milliseconds;
  }

  const startTimeMs = timeToMilliseconds(person.start);
  const endTimeMs = timeToMilliseconds(person.end);

  // Calculate the difference in time
  const totalTimeMs = endTimeMs - startTimeMs;

  // Convert to hours and minutes
  let hours = Math.floor(totalTimeMs / 60000);
  let remainingMinutes = (totalTimeMs % 60000) / 1000;

  if (hours > 0) {
  return `${hours}h:${parseFloat(remainingMinutes.toFixed(2))}m`;
  } else {
    return `${parseFloat(remainingMinutes.toFixed(2))}m`;
  }
}

export default calculateTotalTime;
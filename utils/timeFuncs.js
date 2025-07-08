export function calculateTotalTime(person) {
  if (!person || !person.time) {
    return "Invalid input format";
  }
  
  return `${msFormat(person.time)}s`;
}

export const getDiffInMs = (start, end) => {
  return (end - start); // Returns difference in milliseconds
}

export const msFormat = (ms) => {
  const seconds = ms / 1000;
  return parseFloat(seconds.toFixed(2));
}
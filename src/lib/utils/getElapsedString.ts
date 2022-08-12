export const getElapsedString = (start: number) => {
  const dateStart = new Date(start * 1000);
  const dateNow = Date.now();
  const dateElapsed = dateNow.valueOf() - dateStart.valueOf();

  const seconds = Math.floor(dateElapsed / 1000);
  if (seconds <= 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(dateElapsed / 60000);
  if (minutes <= 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(dateElapsed / 3.6e6);
  if (hours <= 24) {
    return `${hours}h`;
  }

  const days = Math.floor(dateElapsed / 8.64e7);
  if (days <= 7) {
    return `${days}d`;
  }

  const weeks = Math.floor(dateElapsed / 6.048e8);
  if (weeks <= 4) {
    return `${weeks}w`;
  }

  const months = Math.floor(dateElapsed / 2.628e9);
  if (months <= 12) {
    return `${months}w`;
  }

  return `${Math.floor(dateElapsed / 3.154e10)}y`;
};

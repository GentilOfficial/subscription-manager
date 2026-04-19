export const getNextRenewalDate = (date, interval) => {
  if (!date) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let nextRenewal = new Date(date);
  nextRenewal.setHours(0, 0, 0, 0);

  if (!interval || nextRenewal >= today) return nextRenewal;

  while (nextRenewal < today) {
    if (interval === 'Weekly') {
      nextRenewal.setDate(nextRenewal.getDate() + 7);
    } else if (interval === 'Monthly') {
      nextRenewal.setMonth(nextRenewal.getMonth() + 1);
    } else if (interval === 'Yearly') {
      nextRenewal.setFullYear(nextRenewal.getFullYear() + 1);
    } else {
      break;
    }
  }
  return nextRenewal;
};

export const getDaysRemaining = (targetDate) => {
  if (!targetDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

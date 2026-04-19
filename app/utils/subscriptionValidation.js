export const ALLOWED_INTERVALS = ['Weekly', 'Monthly', 'Yearly'];
export const ALLOWED_STATUSES = ['Active', 'Paused', 'Cancelled'];
export const ALLOWED_CATEGORIES = ['Entertainment', 'Music', 'Software', 'Shopping', 'Developer', 'Productivity'];
export const ALLOWED_COLORS = [
  'bg-orange-500',
  'bg-red-500',
  'bg-amber-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-slate-700'
];

export function normalizeSubscription(data) {
  let name = (data.name || 'Unnamed').trim();
  if (name.length > 25) {
    name = name.substring(0, 25);
  }

  let price = parseFloat(data.price);
  if (isNaN(price) || price <= 0) {
    price = 0.01;
  }

  let interval = data.interval;
  if (!ALLOWED_INTERVALS.includes(interval)) {
    interval = 'Monthly';
  }

  let status = data.status;
  if (!ALLOWED_STATUSES.includes(status)) {
    status = 'Active';
  }

  let category = 'Other';
  if (data.category) {
    const found = ALLOWED_CATEGORIES.find(
      (c) => c.toLowerCase() === data.category.toLowerCase()
    );
    category = found || 'Other';
  }

  let color = data.color;
  if (!ALLOWED_COLORS.includes(color)) {
    color = ALLOWED_COLORS[Math.floor(Math.random() * ALLOWED_COLORS.length)];
  }

  let renewalDate = data.renewalDate;
  if (!renewalDate || !/^\d{4}-\d{2}-\d{2}$/.test(renewalDate)) {
    renewalDate = new Date().toISOString().split('T')[0];
  }

  return {
    name,
    price,
    interval,
    category,
    status,
    color,
    renewalDate
  };
}

export function validateSubscription(data, errors) {
  if (!data.name || data.name.trim() === '') {
    return errors.emptyName;
  }
  if (data.name.length > 25) {
    return errors.nameTooLong;
  }
  if (data.price === '' || isNaN(data.price) || Number(data.price) <= 0) {
    return errors.invalidPrice;
  }
  if (!data.renewalDate) {
    return errors.noRenewal;
  }
  if (!data.interval || !ALLOWED_INTERVALS.includes(data.interval)) {
    return errors.noInterval;
  }
  if (!data.status || !ALLOWED_STATUSES.includes(data.status)) {
    return errors.noStatus;
  }
  if (!data.category || ![...ALLOWED_CATEGORIES, 'Other'].includes(data.category)) {
    return errors.noCategory;
  }
  if (!data.color || !ALLOWED_COLORS.includes(data.color)) {
    return errors.noColor;
  }
  return null;
}

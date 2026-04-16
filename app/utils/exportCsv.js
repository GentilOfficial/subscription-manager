export const exportCsv = (subscriptions) => {
  if (!subscriptions || subscriptions.length === 0) return;

  const headers = ['Name', 'Price', 'Interval', 'Category', 'Status', 'Renewal Date'];
  const rows = subscriptions.map(sub => [
    `"${sub.name.replace(/"/g, '""')}"`,
    sub.price,
    sub.interval,
    sub.category,
    sub.status,
    sub.renewalDate || ''
  ]);

  const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "subscriptions.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

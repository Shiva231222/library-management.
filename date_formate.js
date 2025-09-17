function formatDateToDDMMYYYY(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-"); // HTML5 gives yyyy-mm-dd
  return `${day}/${month}/${year}`;
}

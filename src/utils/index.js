export const compare = (a, b, orderBy, order) => {
  let valA = a[orderBy];
  let valB = b[orderBy];

  if (orderBy === "date") {
    valA = new Date(valA);
    valB = new Date(valB);
  }

  const comparison = valA > valB ? 1 : valA < valB ? -1 : 0;
  return order === "asc" ? comparison : -comparison;
}
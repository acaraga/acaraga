export function formatEventDate(date: string) {
  return new Date(date).toLocaleDateString("id, ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

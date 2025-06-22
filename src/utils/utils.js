// For consistent date/time formatting across the app
export function asDateTime(timestamp) {
  return new Date(timestamp.replace(" ", "T"));
}

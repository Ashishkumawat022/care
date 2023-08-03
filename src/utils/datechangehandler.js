export default function datechangeHandler(date) {
  const localDate = new Date(date);
  const localDateString = localDate.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const localTimeString = localDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let resultantstring = `${localDateString} ${localTimeString}` || "";

  return resultantstring;
}

const dateConverter = (date) => {
  const postDate = new Date(date * 1000);
  const today = new Date();
  const isSameDay =
    postDate.getFullYear() === today.getFullYear() &&
    postDate.getMonth() === today.getMonth() &&
    postDate.getDate() === today.getDate();

  const hours = postDate.getHours().toString().padStart(2, "0");
  const minutes = postDate.getMinutes();
  const time = ` ${hours}:${minutes}`;
  const theDate = postDate.toLocaleDateString("ko-KR").replace(/\.$/, "");
  if (isSameDay) {
    return time;
  } else return theDate;
};
export default dateConverter;

const timeConverter = (date) => {//작성시간이 당일일때 HH.MM(24h)형식으로 출력하는 함수
  const postDate = new Date(date * 1000);
  const today = new Date();
  const isSameDay =
    postDate.getFullYear() === today.getFullYear() &&
    postDate.getMonth() === today.getMonth() &&
    postDate.getDate() === today.getDate();

  const hours = postDate.getHours().toString().padStart(2, "0");
  const minutes = postDate.getMinutes().toString().padStart(2, "0");
  const time = ` ${hours}:${minutes}`;
  const theDate = postDate.toLocaleDateString("ko-KR").replace(/\.$/, "");
  if (isSameDay) {
    return time;
  } else return theDate;
};

const dateConverter = (date) => { //YYYY.MM.DD HH:YY 형식 출력하는 함수
  const postDate = new Date(date * 1000);
  const formattedDate = postDate
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\.\s/g, ".") // '. '을 '.'으로 대체
    .replace(/\.$/, ""); //YYYY.MM.DD 형식으로 변환
  const hours = postDate.getHours().toString().padStart(2, "0");
  const minutes = postDate.getMinutes().toString().padStart(2, "0");
  return `${formattedDate} ${hours}:${minutes}`;
};

export { timeConverter, dateConverter };

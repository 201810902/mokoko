const CategoryMapper = (category) => {
  if (!category) return "Cannot find category";
  switch (category) {
    case "community":
      return "💬 자유게시판";
    case "tactics":
      return "🥊 공략게시판";
    case "gallery":
      return "📸 자모앨범";
    case "suggestion":
      return "🙋🏻 건의합니다";
    case "question":
      return "❓ 질문게시판";
    case "bragging":
      return "💰 비틱게시판";
    default:
      return category;
  }
};
export default CategoryMapper;

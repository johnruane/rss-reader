export function sortArticles(sortOrder, articles) {
  let sortedArticles;

  switch (sortOrder) {
    case 'ascending':
      sortedArticles = [...articles].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      break;
    case 'descending':
      sortedArticles = [...articles].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      break;
    default:
      sortedArticles = articles;
  }

  return sortedArticles;
}
export function sortArticles(sortOrder, articles) {
  let sortedArticles;

  switch (sortOrder) {
    case 'ascending':
      sortedArticles = [...articles].sort((a, b) => {
        return a.pubdate - b.pubdate;
      });
      break;
    case 'descending':
      sortedArticles = [...articles].sort((a, b) => {
        return b.pubdate - a.pubdate;
      });
      break;
    default:
      sortedArticles = articles;
  }

  return sortedArticles;
}
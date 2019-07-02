import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ArticleList from './components/ArticleList.js';
import SortBy from './components/SortBy.js';
import ShowMe from './components/ShowMe.js';
import { sortArticles } from './helpers/filterHelpers.js';
import { getPubDate, getWebsiteString } from './helpers/stringHelpers.js';

const sourceWebsites = [
  {title: 'refinery29', url: 'https://www.refinery29.com/rss.xml'},
  {title: 'i-d', url: 'https://i-d.vice.com/en_uk/rss'},
];

export default class RssReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      articlesToShow: [],
      sortOrder: 'descending',
      showMe: 'all'
    }

    this.handleSortArticles = this.handleSortArticles.bind(this);
    this.handleShowMe = this.handleShowMe.bind(this);
  }

  // onclick function to only show a set number of articles
  handleShowMe(e) {
    let showMeValue = (e.target.value === "") ? this.state.articles.length : parseInt(e.target.value, 10);

    this.setState({
      articlesToShow: sortArticles(this.state.sortOrder, this.state.articles.slice(0, showMeValue)),
    });
  }

  // onclick function to sort the articles on show by date
  handleSortArticles(e) {
    this.setState({
      articlesToShow: sortArticles(e.target.value, this.state.articlesToShow),
      sortOrder: e.target.value,
    });
  }

  async componentDidMount() {
    const allArticles = [];

    // collect all xml feeds together in 1 array
    sourceWebsites.forEach(function(element) {
      const promise = getArticleItems(`https://cors-anywhere.herokuapp.com/${element.url}`);
      allArticles.push(promise);
    });

        // prevent further execution until all promises are fulfilled
    const allArticlesDetails = await Promise.all(allArticles);
    const flatArticles = [].concat(...allArticlesDetails);

    // map through array of xml feeds and extract data
    const articles = flatArticles.map((item) => {
      let imageUrl;

      // process long website url to be short version
      const websiteStr = getWebsiteString(item.querySelector('link').textContent);
            
      // site specific code to extract article image url
      switch (websiteStr) {
        case 'refinery29' : 
          const domParser = new DOMParser();
          const imageParser = domParser.parseFromString(item.querySelector('item description').textContent, 'text/xml');
          imageUrl = imageParser.querySelector('figure img').getAttribute('src');
          break;
        case 'i-d.vice' : 
          imageUrl = item.querySelector('enclosure').getAttribute('url');
          break;
        default :
          imageUrl = '--'
      }

      return ({
          website: websiteStr,
          heading: item.querySelector('title').textContent,
          src: imageUrl,
          link: item.querySelector('link').textContent,
          date: getPubDate(item.querySelector('pubDate').textContent),
      })
    })

    // sort articles by default sort order before setting state
    const sortedArticles = sortArticles(this.state.sortOrder, articles);

    this.setState({
      articles: sortedArticles,
      articlesToShow: [...sortedArticles],
    });
  }

  render() {
    return (
      <div className="article-container">
        <div className="header">
          <ShowMe title="Show" showMeChecked={this.state.showMe} onShowClick={this.handleShowMe} />
          <SortBy title="Sort" sortByChecked={this.state.sortOrder} onSortClick={this.handleSortArticles}/>
        </div>
        <ArticleList articles={this.state.articlesToShow} show={this.state.showMe}/>
      </div>
    )
  }
}

// fetch xml data from url and return as an array of DOMLists
async function getArticleItems(url) {
  const response = await fetch(url);
  const results = await response.text();
  const domparser = new DOMParser();
  const document = domparser.parseFromString(results, 'text/xml');
  const [...items] = document.querySelectorAll('channel item');
  return items;
}

ReactDOM.render(<RssReader />, document.getElementById("root"));
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ArticleList from './components/ArticleList.js';
import Pagination from './components/Pagination.js';
import SortBy from './components/SortBy.js';
import ShowMe from './components/ShowMe.js';
import { sortArticles } from './helpers/filterHelpers.js';
import { getPubDate, getWebsiteString } from './helpers/stringHelpers.js';

const sourceWebsites = [
  {title: 'refinery29', url: 'https://www.refinery29.com/rss.xml'},
  {title: 'i-d', url: 'https://i-d.vice.com/en_uk/rss'},
];

const defaultArticles = 8;

export default class RssReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allArticles: [],
      articlesToRender: [],
      sortOrder: 'descending',
      showMe: defaultArticles,
      currentPage: 1,
      numberOfPages: 1,
    }

    this.handleSortArticles = this.handleSortArticles.bind(this);
    this.handleShowMe = this.handleShowMe.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  // onclick function to only show a set number of the main articles
  handleShowMe(e) {
    const showMe = parseInt(e.target.value, 10);
    this.setState({
      articlesToRender: sortArticles(this.state.sortOrder, this.state.allArticles.slice(0, showMe)),
      numberOfPages: Math.ceil(this.state.allArticles.length/showMe),
      showMe: showMe,
    });
  }

  // onclick function to sort the articles on show by date
  handleSortArticles(e) {
    this.setState({
      articlesToRender: sortArticles(e.target.value, this.state.articlesToRender),
      sortOrder: e.target.value,
    });
  }

  // set articlesToRender to be a subset of allArticles based on calculating current position in allArticles
  handlePagination(e) {
    const direction = e.target.value; 
    let currentPage =  this.state.currentPage;

    // prevent click when travelling forwards/backwards in allArticles if conditions met
    if ((direction === 'newer' & currentPage === 1) || (direction === 'older') & currentPage === this.state.numberOfPages) {
      return
    }

    let newArticles = [];
    const allArticles = this.state.allArticles;   
    const showMe = this.state.showMe;

    // work out currentPosition by multiplying currentPage & showMe ie (page 2 * show 8 = allArticles[16])
    if (direction === "older") {
      const currentPosition = this.state.showMe * this.state.currentPage;
      newArticles = allArticles.slice(currentPosition, (currentPosition + showMe));
      this.setState({
        articlesToRender: newArticles,
        currentPage: currentPage + 1,
      })
    } else if (direction === "newer") {
    // going backwards, current position is  is calculated using previous page, then subtracting
      const previousPosition = (this.state.currentPage - 1) * showMe;
      newArticles = allArticles.slice((previousPosition - showMe), previousPosition);
      this.setState({
        articlesToRender: newArticles,
        currentPage: currentPage - 1,
      })
    }
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
    // copy the articles and return a subsection based on 'showMe'
    const articlesToRender = [...sortedArticles].slice(0, this.state.showMe);

    this.setState({
      allArticles: sortedArticles,
      articlesToRender: articlesToRender,
      numberOfPages: Math.ceil(articles.length/this.state.showMe),
    });
  }

  render() {
    return (
      <div className="article-container">
        <div className="header">
          <ShowMe title="Show" showMeChecked={this.state.showMe} onShowClick={this.handleShowMe} maxArticles={defaultArticles} />
          <SortBy title="Sort" sortByChecked={this.state.sortOrder} onSortClick={this.handleSortArticles}/>
        </div>
        <ArticleList articles={this.state.articlesToRender} />
        <Pagination numberOfPages={this.state.numberOfPages} current={this.state.currentPage} handlePagination={this.handlePagination} />
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
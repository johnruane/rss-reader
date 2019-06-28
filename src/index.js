import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const sourceWebsites = [
  {title: 'refinery29', url: 'https://www.refinery29.com/rss.xml'},
  {title: 'i-d', url: 'https://i-d.vice.com/en_uk/rss'},
];

class ArticleList extends React.Component {
  render() {
    const articles = this.props.articles;

    return (
      articles.map((element, index) => {
        return (
          <article className="article" key={index}>
            <div className="article-inner">
              <a className="article-link" href={element.link} target="_blank" rel="noopener noreferrer">
                <img className="article-image" src={element.src} alt=""/>
                <h3 className="article-heading">{element.heading}</h3>                
              </a>
              <p className="article-origin">{element.website} - {element.date}</p>
            </div>
          </article>
        )
      })
    );
  }
}

class FilterByNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilterNumberOption: 'sc-1'
    }

    this.handleFilterNumberChange = this.handleFilterNumberChange.bind(this); 
  }

  handleFilterNumberChange(changeEvent) {
    this.setState({
      selectedFilterNumberOption: changeEvent.target.value
    });
  }

  render() {
    return (
      <div className="filter-by-number">
        <p># of articles: </p>
        <div className="segmented-control" id="sc1">
          <input className="segmented-control-input" type="radio" name="sc-1" id="sc-1-1" 
            checked={this.state.selectedFilterNumberOption === 'sc-1'} onChange={this.handleFilterNumberChange} value="sc-1" />
          <label className="segmented-control-label" htmlFor="sc-1-1">All</label>
          <input className="segmented-control-input" type="radio" name="sc-1" id="sc-1-2"
            checked={this.state.selectedFilterNumberOption === 'sc-2'} onChange={this.handleFilterNumberChange} value="sc-2"/>
          <label className="segmented-control-label" htmlFor="sc-1-2">5</label>
          <input className="segmented-control-input" type="radio" name="sc-1" id="sc-1-3"
            checked={this.state.selectedFilterNumberOption === 'sc-3'} onChange={this.handleFilterNumberChange} value="sc-3"/>
          <label className="segmented-control-label" htmlFor="sc-1-3">10</label>
        </div>
      </div>
    )
  }
}

export default class RssReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
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
          date:getPubDate(item.querySelector('pubDate').textContent),
      })
    })

    this.setState({
      articles: articles,
    });
  }

  render() {
    return (
      <div className="article-container">
        <FilterByNumber />
        <ArticleList articles={this.state.articles}/>
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

function getWebsiteString(str) {
  let strNoProocol = str.split('//')[1];
  let strNoPath = strNoProocol.split('.com')[0];
  let noDubs = strNoPath.replace('www.', '');
  return noDubs;
}

function getPubDate(datestr) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  let newdate = new Date(datestr);
  return `${newdate.getDay()} ${monthNames[newdate.getMonth()]}`
}

ReactDOM.render(<RssReader />, document.getElementById("root"));
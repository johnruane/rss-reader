import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

const sourceWebsites = [
  {title: 'refinery29', url: 'https://cors-anywhere.herokuapp.com/https://www.refinery29.com/rss.xml'},
  {title: 'i-d', url: 'https://cors-anywhere.herokuapp.com/https://i-d.vice.com/en_uk/rss'},
];

let domparser;

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
              <p className="article-origin">{element.site} - {element.date}</p>
            </div>
          </article>
        )
      })
    );
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
    let allArticles = [];
    sourceWebsites.forEach(function(element) {
      let promise = getArticleItems(element.url);
      allArticles.push(promise);
    });

    let allArticlesDetails = await Promise.all(allArticles);
    let flatArticles = [].concat(...allArticlesDetails);
    let articles = flatArticles.map((item) => {
      let imageParser;
      let imageUrl;

      let url = item.querySelector('link').textContent.split('.')[1];
            
      if (url === 'refinery29') {
        let domParser = new DOMParser();
        imageParser = domParser.parseFromString(item.querySelector('item description').textContent, 'text/xml');
        imageUrl = imageParser.querySelector('figure img').getAttribute('src');
      } else if (url === 'vice') {
        imageUrl = item.querySelector('enclosure').getAttribute('url');
        console.log(typeof item.querySelector('enclosure').getAttribute('url'));
      }

      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      let pubdate = item.querySelector('pubDate') ? item.querySelector('pubDate').textContent : '';
      let newdate = new Date(pubdate);

      return ({
          site: url,
          heading: item.querySelector('title').textContent,
          src: imageUrl,
          link: item.querySelector('link').textContent,
          date:`${newdate.getDay()} ${monthNames[newdate.getMonth()]}`,
      })
    })

    this.setState({
      articles: articles,
    });
  
  }

   
  render() {
    return (
      <div className="article-container">
        <ArticleList articles={this.state.articles}/>
      </div>
    )
  }
}

async function getArticleItems(url) {
  const response = await fetch(url);
  const results = await response.text();
  domparser = new DOMParser();
  const document = domparser.parseFromString(results, 'text/xml');
  const [...items] = document.querySelectorAll('channel item');
  return items;
}

ReactDOM.render(<RssReader />, document.getElementById("root"));
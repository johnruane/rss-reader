import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

// const sourceWebsites = ['https://crossorigin.me/https://www.refinery29.com/rss.xml'];

class ArticleList extends React.Component {
  render() {
    const articles = this.props.articles;

    return (
      articles.map((element, index) => {
        return (
          <article className="article" key={index}>
            <a className="article-inner article-link" href={element.link} target="_blank"><img className="article-image" src={element.description} alt=""/>
              <h3 className="article-heading">{element.title}</h3></a>
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
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://www.refinery29.com/rss.xml');
    const results = await response.text();
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(results, 'text/xml');
    const articles = Array.from(doc.querySelectorAll('channel item')).map(item => {
      const imageParser = domparser.parseFromString(item.querySelector('description').textContent, 'text/xml');
      return ({
        title: item.querySelector('title').textContent,
        description: imageParser.querySelector('figure img').getAttribute('src'),
        link: item.querySelector('link').textContent,
      })
    });
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

ReactDOM.render(<RssReader />, document.getElementById("root"));
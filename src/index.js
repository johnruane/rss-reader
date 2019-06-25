import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// const sourceWebsites = ['https://crossorigin.me/https://www.refinery29.com/rss.xml'];

class ArticleList extends React.Component {
  render() {
    const articles = this.props.articles;
    return (
      articles.forEach((element, index) => {
        return (
          <article className="article" key="{key}">
            <img className="article-image" src="https://placeimg.com/240/146/any" alt=""/>
            <p className="article-heading">{element.childNodes[0]}</p>
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
   
  renderArticle(text) {
    return (
      <article className="article" key="{key}">
        <img className="article-image" src="https://placeimg.com/240/146/any" alt=""/>
        <p className="article-heading">{text}</p>
      </article>
    );
  }
   
  async componentDidMount() {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://www.refinery29.com/rss.xml');
    const results = await response.text();
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(results, 'text/xml');
    const articles = [...doc.querySelectorAll('channel item')];
    console.log(articles);
    this.setState({
      articles: articles,
    });
  }
   
  render() {
    return (
      <div>
        <ArticleList articles={this.state.articles}/>
      </div>
    )
  }
}

ReactDOM.render(<RssReader />, document.getElementById("root"));
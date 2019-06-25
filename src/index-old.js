import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const e = React.createElement;

class ArticleList extends React.Component {
  render() {
    const {articles} = this.props;
    return (
      e('ul', {}, articles.map((article, index) => {
        return e(
          'li', 
          {key: index, className: 'article'}, 
          e('a', {href: article.link}, article.title)
        );
      }))
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
    const articles = [...doc.querySelectorAll('channel item')].map(item => {
      return {
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
      };
    });

    this.setState({ articles });
  }



  render() {
      return e('div', {articles: this.state.articles || []}, e(ArticleList, {articles: this.state.articles}));
  }
}

ReactDOM.render(<RssReader/>, document.getElementById("root"));
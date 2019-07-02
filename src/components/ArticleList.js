import React from 'react';

class ArticleList extends React.Component {
    render() {
      let articles = this.props.articles;
  
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

  export default ArticleList;
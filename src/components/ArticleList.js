import React from 'react';
import imagePlaceholder from './images/550x300.png';
import ProgressiveImage from './ProgressiveImage.js';

class ArticleList extends React.Component {
    render() {
      let articles = this.props.articles;
  
      return (
        articles.map((element, index) => {
          return (
            <article className="article" key={index}>
              <div className="article-inner">
                <a className="article-link" href={element.link} target="_blank" rel="noopener noreferrer">
                  <ProgressiveImage preview={imagePlaceholder} image={element.src}></ProgressiveImage>
                  <h3 className="article-heading">{element.heading}</h3>                
                </a>
                <p className="article-origin">{element.website} - {element.displaydate}</p>
              </div>
            </article>
          )
        })
      );
    }
  }

  export default ArticleList;
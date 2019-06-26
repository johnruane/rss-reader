import React from 'react';
import ReactDOM from 'react-dom';

class Refinery29Parser extends React.Component {
    render() {
        const articles = this.props.articles;

        return (
            articles = Array.from(document.querySelectorAll('channel item')).map(article => {
                const imageParser = domparser.parseFromString(article.querySelector('item description').textContent, 'text/xml');
                return ({
                    title: document.querySelector('channel title').textContent,
                    heading: article.querySelector('title').textContent,
                    description: imageParser.querySelector('figure img').getAttribute('src'),
                    link: article.querySelector('link').textContent,
                    date: document.querySelector('channel pubDate'),
                })
            })
        );
    }
}

export default Refinery29;
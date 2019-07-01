{/* 
<channel>
    <title>Refinery29</title>
    <language>en-us</language>
    <description>Refinery29</description>
    <link>https://www.refinery29.com</link>
    <category>Refinery29</category>
    <atom:link rel="self" href="https://www.refinery29.com/rss.xml"/>
    <atom:link rel="next" href="https://www.refinery29.com/rss.xml?page=2"/>
    <pubDate>Thu, 27 Jun 2019 09:23:12 +0000</pubDate>
    <link xmlns="http://www.w3.org/2005/Atom" rel="hub" href="http://refinery29.superfeedr.com/"/>
    <link xmlns="http://www.w3.org/2005/Atom" rel="self" href="https://www.refinery29.com/rss.xml"/>
    <item>
        <title>The Key Moments From The First Presidential Primary Debate</title>
        <link>https://www.refinery29.com/en-us/2019/06/236423/first-democratic-debate-highlights-important-moments-warren-beto?utm_source=feed&utm_medium=rss</link>
        <guid>https://www.refinery29.com/en-us/2019/06/236423/first-democratic-debate-highlights-important-moments-warren-beto?utm_source=feed&utm_medium=rss</guid>
        <description>...</description>
        <dc:creator>Andrea González-Ramírez</dc:creator>
        <dc:creator>written by Andrea González-Ramírez</dc:creator>
        <dc:creator>written by Tiffany Tso</dc:creator>
        <pubDate>Thu, 27 Jun 2019 03:10:00 +0000</pubDate>
    </item>
*/}

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
import React from 'react';

export default class ShowMe extends React.Component {
  render() {
    const { onShowClick, showMeChecked, maxArticles } = this.props;
    return (
      <div className="filter-by">
        <p className="filter-heading">{this.props.title}: </p>
        <div className="segmented-control">      
          <input className="segmented-control-input" type="radio" name="sc-2" id="sc-2-1" 
            defaultChecked={showMeChecked === maxArticles} onChange={e => onShowClick(e)} value={maxArticles} />
          <label className="segmented-control-label" htmlFor="sc-2-1">MAX</label>
          <input className="segmented-control-input" type="radio" name="sc-2" id="sc-2-2" 
            defaultChecked={showMeChecked === "five"} onChange={e => onShowClick(e)} value="5" />
          <label className="segmented-control-label" htmlFor="sc-2-2">5</label>
          <input className="segmented-control-input" type="radio" name="sc-2" id="sc-2-3" 
            defaultChecked={showMeChecked === "ten"} onChange={e => onShowClick(e)} value="10" />
          <label className="segmented-control-label" htmlFor="sc-2-3">10</label>
        </div>
      </div>
    )
  }
}

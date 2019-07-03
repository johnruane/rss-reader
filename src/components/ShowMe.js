import React from 'react';

export default class ShowMe extends React.Component {
  render() {
    const { onShowClick, showMeChecked } = this.props;
    return (
      <div className="filter-by">
        <p className="filter-heading">{this.props.title}: </p>
        <div className="segmented-control">      
          <input className="segmented-control-input" type="radio" name="sc-2" id="sc-2-1" 
            defaultChecked={showMeChecked === 5} onChange={e => onShowClick(e)} value="5" />
          <label className="segmented-control-label" htmlFor="sc-2-1">5</label>
          <input className="segmented-control-input" type="radio" name="sc-2" id="sc-2-2" 
            defaultChecked={showMeChecked === 10} onChange={e => onShowClick(e)} value="10" />
          <label className="segmented-control-label" htmlFor="sc-2-2">10</label>
          <input className="segmented-control-input" type="radio" name="sc-2" id="sc-2-3" 
            defaultChecked={showMeChecked === 25} onChange={e => onShowClick(e)} value="25" />
          <label className="segmented-control-label" htmlFor="sc-2-3">25</label>
        </div>
      </div>
    )
  }
}

import React from 'react';

export default class FilterBy extends React.Component {
  render() {
    const { onFilterClick, filterByChecked } = this.props;
    return (
      <div className="filter-by">
        <p className="filter-heading">{this.props.title}: </p>
        <div className="segmented-control">      
          <input className="segmented-control-input" type="radio" name="sc-2" id="sc-2-1" 
            defaultChecked={filterByChecked === "all"} onChange={e => onFilterClick(e)} value="all" />
          <label className="segmented-control-label" htmlFor="sc-2-1">ALL</label>
          <input className="segmented-control-input" type="radio" name="sc-2" id="sc-2-2" 
            defaultChecked={filterByChecked === "five"} onChange={e => onFilterClick(e)} value="five" />
          <label className="segmented-control-label" htmlFor="sc-2-2">5</label>
          <input className="segmented-control-input" type="radio" name="sc-2" id="sc-2-3" 
            defaultChecked={filterByChecked === "ten"} onChange={e => onFilterClick(e)} value="ten" />
          <label className="segmented-control-label" htmlFor="sc-2-3">10</label>
        </div>
      </div>
    )
  }
}

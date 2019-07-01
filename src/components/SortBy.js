import React from 'react';

export default class SortBy extends React.Component {
  render() {
    const { onSortClick, sortByChecked } = this.props;
    return (
      <div className="filter-by">
        <p className="filter-heading">{this.props.title}: </p>
        <div className="segmented-control">
          <input className="segmented-control-input" type="radio" name="sc-1" id="sc-1-2" 
            defaultChecked={sortByChecked === "descending"} onChange={e => onSortClick(e)} value="descending" />
          <label className="segmented-control-label" htmlFor="sc-1-2">↓</label>
          <input className="segmented-control-input" type="radio" name="sc-1" id="sc-1-1" 
            defaultChecked={sortByChecked === "ascending"} onChange={e => onSortClick(e)} value="ascending" />
          <label className="segmented-control-label" htmlFor="sc-1-1">↑</label>
        </div>
      </div>
    )
  }
}

import React from 'react';

class SortBy extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: props.id,
        title: props.title,
        sortOptions: props.sortOptions,
        selectedOption: `sc-${props.id}-0`,
      }
  
      this.handleChange = this.handleChange.bind(this); 
    }
  
    handleChange(changeEvent) {
      this.setState({
        selectedOption: changeEvent.target.value
      });
    }
  
    render() {
      return (
        <div className="filter-by-number">
          <p className="filter-heading">{this.state.title}: </p>
          <div className="segmented-control">      
            { this.state.sortOptions.map((element, index) => {
              return (
                <React.Fragment>
                  <input className="segmented-control-input" type="radio" name={"sc-"+ this.state.id} id={"sc-"+ this.state.id +"-"+ index} 
                    checked={this.state.selectedOption === "sc-"+ this.state.id +"-"+ index} onChange={this.handleChange} value={"sc-"+ this.state.id +"-"+ index} />
                  <label className="segmented-control-label" htmlFor={"sc-"+ this.state.id +"-"+ index}>{element}</label>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      )
    }
  }

  export default SortBy;
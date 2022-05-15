import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    const filterText = this.props.filterText;

    return (
      <div>
        <div className="container align-left my-5 my-lg-0 my-md-0">
          <form className="param-padding ">
            <h3 className="make-inline">Search for Tutors</h3>
            <input
              type="text"
              placeholder="Search by Name or Subject.."
              className="form-control make-inline searchField mx-4 mx-lg-0 mx-md-0"
              value={filterText}
              onChange={this.handleFilterTextChange}
            ></input>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;

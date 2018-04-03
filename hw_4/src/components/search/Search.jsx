import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    }
    this.inputChange = this.inputChange.bind(this);
  }
  inputChange(e) {
    this.setState({ search: e.target.value });
    this.searchFunc(e.target.value);
  }
  searchFunc(text) {
    let searchResult = this.props.items.filter( item => item.title.toLowerCase().includes(text.toLowerCase()) );
    this.props.onSearchEvent(searchResult, text);
  }
  render() {
    return (
      <input 
        type="text" 
        placeholder="Search" 
        className="post__input"
        value={ this.state.search }
        onChange={ this.inputChange }
      />
    );
  }
}

export default Search;
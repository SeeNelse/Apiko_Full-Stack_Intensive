import React, { Component } from 'react';
import Data from '../../data.json'
import './Content.css';
import Search from '../search/Search';

class Content extends Component {
  constructor() {
    super();
    this.data = Data;
    this.searchData = [];
    this.state = {
      count: 10,
      items: this.data.slice(0, 10),
      showLoadMore: true,
    }
  }
  loadMore() {
    let data;
    if (this.searchData.length) {
      data = this.searchData.slice(0, this.state.count + 10)
    } else {
      data = this.data.slice(0, this.state.count + 10)
    }
    this.setState(prevState => ({
      count: prevState.count + 10,
      items: data,
      showLoadMore: data.length >= prevState.count + 10,
    }));
  }
  handleSearch(searchResult, searchValue) {
    this.searchData = searchResult;
    this.setState(prevState => ({
      count: 10,
      items: this.searchData.slice(0, 10),
      showLoadMore: this.searchData.length ? true : '',
    }));
    this.searchValue = searchValue;
  }
  render() {
    let postItems = this.state.items.map((item) => {
      return (
        <li className="post__item" key={item.id}>
          <h5 className="post__head">{item.title}</h5>
          <p className="post__body">{item.body}</p>
        </li>
      );
    });
    return (
      <div className="wrapper">
        <Search 
          items={ this.data }
          onSearchEvent={ this.handleSearch.bind(this) }
        />
        <ul className="post__list">
          {postItems}
        </ul>
        {this.state.showLoadMore && <button className="post__more" onClick={this.loadMore.bind(this)}>More</button>}
        {!this.searchData.length && this.searchValue && <p className="post__error">No items found</p>}
      </div>
    );
  }
}

export default Content;
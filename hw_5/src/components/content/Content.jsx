import React, { Component } from 'react';
import Data from '../../data.json'
import './Content.css';
import Search from '../search/Search';
import Item from '../item/Item';

class Content extends Component {
  constructor() {
    super();
    this.searchData = [];
    this.state = {
      count: 10,
      data: [],
      items: [],
      showLoadMore: true,
      isLoading: true,
    }
  }
  componentDidMount() {
    this.fetchData();
    setInterval(() => {
      this.fetchData();
    }, 10000);
  }

  fetchData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      this.setState({
        data,
        isLoading: false,
        items: data.slice(0, 10),
      });
    })
  }
  loadMore() {
    let data;
    if (this.searchData.length) {
      data = this.searchData.slice(0, this.state.count + 10)
    } else {
      data = this.state.data.slice(0, this.state.count + 10)
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
    if (this.state.isLoading) {
      return (
        <div className="load">
          <div className="load__block">
            <span className="load__1"></span>
            <span className="load__2"></span>
          </div>
        </div>
      )
    }
    let postItems = this.state.items.map((item) => {
      return (
        <Item 
          dataItem={ item } 
          key={ item.id } 
        />
      );
    });
    return (
      <div className="wrapper">
        <Search
          items={ this.state.data }
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
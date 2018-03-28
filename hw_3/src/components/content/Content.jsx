import React, { Component } from 'react';
import Data from '../../data.json'
import './Content.css';

class Content extends Component {
  constructor() {
    super();
    this.data = Data;
    this.state = {
      count: 10,
      items: this.data.slice(0, 10),
    }
  }
  loadMore() {
    this.setState(prevState => ({
      count: prevState.count + 10,
      items: this.data.slice(0, prevState.count + 10),
    }));
  }
  render() {
    console.log( this.state.count );
    let postItems = this.state.items.map((item) => {
      return (
        <li className="post__item" key={ item.id }>
          <h5 className="post__head">{ item.title }</h5>
          <p className="post__body">{ item.body }</p>
        </li>
      );
    });
    return (
      <div className="wrapper">
        <ul className="post__list">
          {postItems}
        </ul>
        <button className="post__more" onClick={ this.loadMore.bind(this) }>More</button>
      </div>
    );
  }
}

export default Content;
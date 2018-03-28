import React, { Component } from 'react';
import Data from '../../data.json'
import Button from '../button/Button'

class Content extends Component {
  constructor() {
    super();
    this.data = Data;
    this.state = {
      count: 10,
      items: this.data.slice(0, 10),
      show: true,
    }
  }
  loadMore() {
    this.setState(prevState => ({
      count: prevState.count + 10,
      items: this.data.slice(0, prevState.count + 10),
    }));
  }
  testBtn(x) {
    console.log(x);
  }
  render() {
    let postItems = this.state.items.map((item) => {
      return (
        <li className="post__item" key={ item.id }>
          <h5 className="post__head">{ item.title } { item.id }</h5>
          <p className="post__body">{ item.body }</p>
        </li>
      );
    });
    return (
      <div className="wrapper">
        <ul className="post_list">
          {postItems}
        </ul>
        {this.state.show && <button className="post__more" onClick={ this.loadMore.bind(this) }>More</button>}
        <Button onClickEvent={ this.testBtn } title="Кнопка" />
      </div>
    );
  }
}

export default Content;
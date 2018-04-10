import React, { Component } from 'react';

class Item extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.dataItem.id === nextProps.id) {
      return false;
    }
    return true;
  }
  render() {
    return (
      <li className="post__item">
        <h5 className="post__head">{this.props.dataItem.title}</h5>
        <p className="post__body">{this.props.dataItem.body}</p>
      </li>
    );
  }
}

export default Item;
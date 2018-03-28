import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button onClick={ () => this.props.onClickEvent(1) }>{ this.props.title }</button>
    );
  }
}

export default Button;
import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header__head">Apiko Full-Stack Intensive: Homework #4</h1>
        <a href="https://github.com/SeeNelse/Apiko_Full-Stack_Intensive" target="_blank"><img src="github.png" alt="github" className="header__gh" /></a>
      </header>
    );
  }
}

export default Header;
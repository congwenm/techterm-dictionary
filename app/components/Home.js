import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';
import Dictionary from './Dictionary';


export default class Home extends Component {
  render() {
    return (
      <div>      
        <h2>Dictionary</h2>
        <Dictionary />
      </div>
    );
  }
}

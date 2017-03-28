import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Main page</h3>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/calendar">Calendar</Link></li>
        </ul>
      </div>
    )
  }
}
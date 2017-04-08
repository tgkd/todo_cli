import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const location = window.location.pathname;
    const {logout} = this.props;
    return (
      <div className="row center-md center-sm center-xs nav-links">
        <div className="col-xs-10 col-sm-10 col-md-10">
          <div className="row between-xs between-sm between-md">
            <div className="col-md-1 col-sm-1 col-xs-1 nav-links__back">
              {location === '/main' ?
                ''
                :
                <Link to='/find_by_email'>
                  <img src="/assets/back.svg" alt="exit"/>
                </Link>
              }
            </div>
            <div onClick={logout} className="nav-links__logout col-md-2 col-sm-2 col-xs-2">
              <img src="/assets/exit.svg" alt="exit"/>
              <span>&nbsp;Выйти</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
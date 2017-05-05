import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    const { logout } = this.props;
    logout()
      .then(response => {
        window.location.href = '/';
      })
      .catch(e => {
        this.setState({
          error: 'Ошибка, повторите попытку'
        });
      });
  }

  render() {
    return (
      <div className="row center-md center-sm center-xs">
        <div className="col-xs-10 nav-links">
          <div className="row between-xs between-sm between-md">

            <div className="nav-links__back">
              <Link to='/find_by_email'>
                <img src="/assets/images/icons/back.svg" alt="exit"/>
              </Link>
            </div>

            <div onClick={::this.logout} className="nav-links__logout">
              <img src="/assets/images/icons/exit.svg" alt="exit"/>
              <span className="noselect">&nbsp;Выйти</span>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
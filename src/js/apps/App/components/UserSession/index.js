import React, {Component} from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  terminateSession(id) {
    this.props.terminateSession(id);
  }

  render() {
    const { os, type, id, browser } = this.props;
    return (
      <div className="row middle-xs middle-sm middle-md profile-container__session">
        <div className="col-xs-9 col-sm-9 col-md-9">
          <p className="session-name">{type}, {os}, {browser}</p>
        </div>
        <div className="col-xs-3 col-sm-3 col-md-3 session-button" onClick={this.terminateSession.bind(this, id)}>
          <span className="fa fa-ban"/>
          <span>&nbsp;Terminate</span>
        </div>
      </div>
    )
  }
}
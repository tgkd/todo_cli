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
      <div className='row middle-xs middle-sm middle-md profile-container__session'>
        <div className='col-xs-5 col-sm-8 col-md-10'>
          <p className='session-name'>{type}, {os}, {browser}</p>
        </div>
        <div className='col-xs-7 col-sm-4 col-md-2 icon-button' onClick={this.terminateSession.bind(this, id)}>
          <span className='fa fa-ban icon-button__ico'/>
          <span className="icon-button__text">Terminate</span>
        </div>
      </div>
    )
  }
}
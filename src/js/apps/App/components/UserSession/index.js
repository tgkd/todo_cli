import React, {Component} from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  terminateSession(id) {
    this.props.terminateSession(id);
  }

  showMore(e) {
    const title = document.querySelectorAll('.session-name__title');
    if (!title.length) {
      const span = document.createElement('span');
      span.className = 'session-name__title';
      span.innerHTML = e.target.attributes['title'].value;
      e.target.appendChild(span);
      setTimeout(() => {
        span.remove();
      }, 3000);
    } else {
      title[0].remove();
    }
  }

  render() {
    const { os, type, id, browser } = this.props;
    return (
      <div className='row middle-xs middle-sm middle-md profile-container__session'>
        <div className='col-xs-5 col-sm-8 col-md-9 session-name'>
          <p onClick={::this.showMore} className='session-name__text'
             title={`${type}, ${os}, ${browser}`}>{type}, {os}, {browser}</p>
        </div>
        <div className='col-xs-7 col-sm-4 col-md-3 icon-button' onClick={this.terminateSession.bind(this, id)}>
          <span className='fa fa-ban icon-button__ico'/>
          <span className="icon-button__text">Завершить</span>
        </div>
      </div>
    );
  }
}
import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      end: '',
      done: false
    }
  }

  createTask() {
    this.props.createTask(this.state);
  }

  render() {
    return (
      <div className="row middle-xs middle-sm middle-md">
        <div className="col-xs-10 col-sm-10 col-md-10">
          <div id="input-img-container">
            <input type="text" className="input input--blue tasks-container__input" placeholder="Новое дело"/>
            {/*<svg className="input-img-container__img" width="18" height="20" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg">
             <title>8F18FF8D-0089-4998-AECB-EA32DEACFFFF</title>
             <path d="M16 2h-1V0h-2v2H5V0H3v2H2C.89 2 .01 2.9.01 4L0 18a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H2V7h14v11zM4 9h5v5H4V9z" fill="#566394" fill-rule="evenodd"/>
             </svg>*/}
          </div>
        </div>
        <div className="col-xs-2 col-sm-2 col-md-2">
          <button className="btn btn-default btn--greyblue" onClick={::this.createTask}>Добавить</button>
        </div>
      </div>
    )
  }
}
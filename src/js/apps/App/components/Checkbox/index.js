import React, { Component } from 'react'
import './index.styl'

export default class extends Component {
  constructor(props) {
    super(props);
  }
  getClassName() {
    return `checkbox ${this.props.type ? 'checkbox--checked' : 'checkbox--unchecked'}`
  }

  render() {
    const { changeState, type } = this.props;
    return (
      <div
        className={::this.getClassName()}
        onClick={changeState}>
        {
          type ? <span className="fa fa-check checkbox__check"/> : null
        }
      </div>
    )
  }
}
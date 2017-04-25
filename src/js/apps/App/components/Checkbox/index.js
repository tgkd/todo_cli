import React, {Component} from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
  }
  getClassName() {
    return `checkbox ${this.props.checked ? 'checkbox--checked' : 'checkbox--unchecked'}`;
  }

  render() {
    const { changeState, checked } = this.props;
    return (
      <div
        className={::this.getClassName()}
        onClick={changeState}>
        {
          checked ? <span className="fa fa-check checkbox__check"/> : null
        }
      </div>
    );
  }
}
import React, {Component} from 'react';

export default class extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { size } = this.props;
    const loaderSize = { height: `${size || 10}px`, width: `${size || 10}px` };
    return <div style={loaderSize} className="loader"/>;
  }
}
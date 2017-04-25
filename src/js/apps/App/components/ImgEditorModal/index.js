import React, {Component} from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { photo, hideEditorModal } = this.props;

    return (
      <div className='modal editor-modal'>
        <div className="modal__content">

        </div>
        <span>test</span>
      </div>
    );
  }
}
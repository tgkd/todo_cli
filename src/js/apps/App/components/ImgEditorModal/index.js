import React, {Component} from 'react';
import {Stage, Layer, Image} from 'react-konva';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.photo;
    image.onload = () => {
      this.setState({
        image: image
      });
    };
  }

  render() {
    const { hideEditorModal } = this.props;
    const { image } = this.state;
    return (
    <div className='modal editor-modal'>
      <div className="modal__content">
        <Stage width={700} height={700}>
          <Layer>
            <Image image={image}/>
          </Layer>
        </Stage>
      </div>
    </div>

    );
  }
}
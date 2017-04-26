import React, {Component} from 'react';
import AvatarEditor from 'react-avatar-editor';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
      scale: 1.2,
      position: { x: 0.5, y: 0.5 },
      lastPosition: { x: null, y: null }
    };
  }

  setScale(e) {
    this.setState({
      scale: parseFloat(e.target.value)
    });
  }

  componentDidMount() {
    const windowWidth = window.innerWidth;
    const editorSize = { width: 300, height: 300 };

    if (windowWidth < 450) {
      editorSize.width = 200;
      editorSize.height = 200;
    }
    this.setState(editorSize);
  }

  saveImage() {
    const { saveAvatar } = this.props;
    const canvas = this.editor.getImage().toDataURL();
    saveAvatar(canvas);
  }

  touchStartHandler(e) {
    e.preventDefault();

    const touchObj = e.changedTouches[0];
    if (e.target.nodeName === 'CANVAS') {
      this.setState({
        lastPosition: {
          x: parseInt(touchObj.clientX),
          y: parseInt(touchObj.clientY)
        }
      });
    }
  }

  touchMoveHandler(e) {
    e.preventDefault();
    const { lastPosition, position } = this.state;
    const touchObj = e.changedTouches[0];
    const currentX = parseInt(touchObj.clientX);
    const currentY = parseInt(touchObj.clientY);
    if (e.target.nodeName === 'CANVAS') {
      const newX = position.x + (currentX > lastPosition.x ? -0.005 : 0.005);
      const newY = position.y + (currentY > lastPosition.y ? -0.005 : 0.005);
      this.setState({
        position: {
          x: newX < 0 ? 0 : newX > 1 ? 1 : newX,
          y: newY < 0 ? 0 : newY > 1 ? 1 : newY
        },
        lastPosition: {
          x: currentX,
          y: currentY
        }
      });
    }
  }

  changePosition(position) {
    this.setState({ position: position });
  }

  hideEditorModal(e) {
    const { hideEditorModal } = this.props;
    if (e.target.className === 'modal') {
      hideEditorModal();
    }
  }

  render() {
    const { photo, hideEditorModal } = this.props;
    const { width, height, scale, position } = this.state;
    return (
      <div className='modal' onMouseDown={::this.hideEditorModal}>
        <div className="modal-content" onTouchStart={::this.touchStartHandler} onTouchMove={::this.touchMoveHandler}>
          <AvatarEditor
            ref={(editor) => {
              this.editor = editor;
            }}
            onPositionChange={::this.changePosition}
            position={position}
            image={photo}
            width={width}
            height={height}
            border={30}
            borderRadius={150}
            color={[0, 0, 0, 0.5]}
            scale={scale}
          />
          <br/>
          <div className="row center-sm center-md center-xs">
            <div className="col-xs-8 col-sm-8 col-md-8">
              <input className="modal-content__scale"
                     type="range"
                     min={1}
                     max={2}
                     step={0.1}
                     value={this.state.scale}
                     onChange={::this.setScale}/>
            </div>
          </div>
          <div className="row center-sm center-md center-xs">
            <div className="col-xs-8 col-sm-8 col-md-8">
              <button className="btn btn-enter btn--greyblue" onClick={::this.saveImage}>Выбрать</button>
            </div>
          </div>
          <br/>
          <div className="row center-sm center-md center-xs">
            <div className="col-xs-8 col-sm-8 col-md-8">
              <button className="btn btn-enter btn--greyblue" onClick={hideEditorModal}>Закрыть</button>
            </div>
          </div>
      </div>
    </div>
    );
  }
}
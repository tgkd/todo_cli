import React, {Component} from 'react';
import ImgEditorModal from '../ImgEditorModal';

export default class extends Component {
  constructor(props) {
    super(props);
    this.defaultAvatar = 'http://localhost:3001/assets/images/profile/unknown.svg';
    this.state = {
      showImgEditor: false,
      photo: null
    };
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = (upload) => {
      this.setState({
        photo: upload.target.result,
        showImgEditor: true
      });
    };
    reader.readAsDataURL(file);
  }

  hideEditorModal() {
    this.setState({
      showImgEditor: false
    });
  }

  render() {
    const { photo } = this.props;
    const { showImgEditor } = this.state;
    const newPhoto = this.state.photo;
    const imageStyle = {
      backgroundImage: photo && photo.length !== 0
        ? `url(${photo})`
        : `url(${this.defaultAvatar})`
    };
    return (
      <div className="row center-xs center-sm center-md">
        {
          showImgEditor && newPhoto
            ? <ImgEditorModal photo={newPhoto} hideEditorModal={::this.hideEditorModal}/>
            : null
        }
        <div className="col-md-12 col-xs-12 col-sm-12 avatar-container">
          <div className="profile-container__avatar" style={imageStyle}/>
        </div>
        <div className="col-md-5 col-xs-5 col-sm-5">
          <form encType="multipart/form-data">

            <input type="file" name="file" id="file" className="profile-container__file" onChange={::this.handleFile}/>
            <label htmlFor="file" className="profile-container__loader btn-rounded">Загрузить</label>
          </form>
        </div>
      </div>
    );
  }
}
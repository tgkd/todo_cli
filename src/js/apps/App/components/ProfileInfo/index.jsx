import React, {Component} from 'react';
import ImgEditorModal from '../ImgEditorModal';

export default class extends Component {
  constructor(props) {
    super(props);
    const host = PRODUCTION ? window.location.origin : 'http://localhost:3001';
    this.defaultAvatar = host + '/assets/images/profile/unknown.svg';
    this.state = {
      showImgEditor: false,
      photo: null,
      croppedAvatar: null
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

  saveAvatar(image) {
    this.setState({
      croppedAvatar: image,
      showImgEditor: false
    }, () => {
      const { saveNewPhoto } = this.props;
      saveNewPhoto(this.state.croppedAvatar);
    });
  }

  getImageStyle() {
    const { photo } = this.props;
    const { croppedAvatar } = this.state;
    let img = null;

    if (croppedAvatar && croppedAvatar.length !== 0) {
      img = croppedAvatar;
    } else {
      if ((photo && photo.length !== 0)) {
        img = photo;
      } else {
        img = this.defaultAvatar;
      }
    }

    return { backgroundImage: `url(${img})` };
  }

  render() {
    const { showImgEditor } = this.state;
    const newPhoto = this.state.photo;

    return (
      <div className="row center-xs center-sm center-md">
        {
          showImgEditor && newPhoto
            ? <ImgEditorModal saveAvatar={::this.saveAvatar} photo={newPhoto} hideEditorModal={::this.hideEditorModal}/>
            : null
        }
        <div className="col-md-12 col-xs-12 col-sm-12 avatar-container">
          <div className="profile-container__avatar" style={::this.getImageStyle()}/>
        </div>
        <div className="col-md-5 col-xs-5 col-sm-5">
          <form encType="multipart/form-data">
            <input type="file" name="file" multiple={false} accept="image/*" id="file"
                   className="profile-container__file" onChange={::this.handleFile}/>
            <label htmlFor="file" className="profile-container__loader btn-rounded">Загрузить</label>
          </form>
        </div>
      </div>
    );
  }
}
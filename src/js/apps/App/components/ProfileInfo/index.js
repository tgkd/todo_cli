import React, {Component} from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.defaultAvatar = 'http://localhost:3001/assets/images/profile/unknown.svg';
  }

  handleFile(e) {
    this.props.handleFile(e);
  }

  render() {
    const { photo } = this.props;

    const imageStyle = {
      backgroundImage: photo && photo.length !== 0
        ? `url(${photo})`
        : `url(${this.defaultAvatar})`
    };
    return (
      <div className="row center-xs center-sm center-md">
        <div className="col-md-12 col-xs-12 col-sm-12 avatar-container">
          <div className="profile-container__avatar" style={imageStyle}></div>
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
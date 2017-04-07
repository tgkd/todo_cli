import React, {Component} from 'react';

export default class extends Component {
  constructor(props) {
    super(props);

  }

  handleFile(e) {
    this.props.handleFile(e);
  }

  render() {
    const { photo } = this.props;
    return (
      <div className="row center-xs center-sm center-md">
        <div className="col-md-12 col-xs-12 col-sm-12">
          <img src={ photo || '/assets/unknown.svg' } className="profile-container__avatar"/>
        </div>
        <div className="col-md-5 col-xs-5 col-sm-5">
          <form encType="multipart/form-data">

            <input type="file" name="file" id="file" className="profile-container__file" onChange={::this.handleFile}/>
            <label htmlFor="file" className="profile-container__loader btn-rounded">Загрузить</label>
          </form>
        </div>
      </div>
    )
  }
}
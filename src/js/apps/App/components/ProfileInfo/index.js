import React, {Component} from 'react';

export default class extends Component {
  constructor(props) {
    super(props);

  }

  uploadClick() {
    this.uploadInput.click();
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
            <button className="btn btn-rounded" onClick={::this.uploadClick}>
              Загрузить
            </button>
            <input
              className=""
              type="file"
              onChange={::this.handleFile}
              ref={(input) => {
                this.uploadInput = input;
              }}
            />
          </form>
        </div>
      </div>
    )
  }
}
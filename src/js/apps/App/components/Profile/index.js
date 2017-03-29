import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    let user = this.props.user;
    this.state = {
      user: {
        name: user ? user.name : '',
        birthday: user ? user.birthday : null,
        photo: user ? user.photo : null
      },
      sessions: this.props.sessions
    }
  }

  setName(e) {
    this.setState({
      user: {
        ...this.state.user,
        name: e.target.value
      }
    })
  }

  setDate(e) {
    this.setState({
      user: {
        ...this.state.user,
        birthday: e.target.value
      }
    })
  }

  saveHandler() {
    let userInfo = this.state.user;
    this.props.updateUserInfo(this.state.user);

  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = (upload) => {
      this.setState({
        user: {
          ...this.state.user,
          photo: upload.target.result
        }
      });
    };

    reader.readAsDataURL(file);
  }


  terminateSession(id) {
    this.props.terminateSession(id)
  }

  render() {
    const sessions = this.props.sessions;
    let sessionsList;
    if(sessions) {
      sessionsList = sessions.map(item => {
        return(
          <div key={item._id}>
            <p>{item.os}</p>
            <button onClick={this.terminateSession.bind(this, item._id)}>X</button>
          </div>
        )
      })
    }
    return (
      <div>
        <img src={ this.state.user.photo } />
        <form encType="multipart/form-data" >
          <input type="file" onChange={::this.handleFile} />
        </form>
        <input type="text" placeholder="name" value={this.state.user.name} onChange={::this.setName}/>
        <br/>
        <input type="date" value={this.state.user.birthday} onChange={::this.setDate} />
        <br/>
        <button onClick={::this.saveHandler}>save</button>

        <p>sessions</p>
        {sessionsList}
      </div>
    )
  }
}
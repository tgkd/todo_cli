import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);

  }

  onChangeHandler(e) {

  }

  onClickHandler() {

  }

  render() {
    const user = this.props.user;
    const sessions = this.props.sessions;
    return (
      <div>

        <img src={user.photo || ''} />
        <button onClick={}>new photo</button>
        <input type="text" placeholder="name" value={user.name} onChange={::this.onChangeHandler}/>
        {/*input + calendar*/}
        <br/>
        <button onClick={::this.onClickHandler}>save</button>

        <p>sessions</p>
        {
          sessions.map(item => {
            return(
              <div>
                <p>{item.os}</p>
                <button onClick={{/**/}}>terminate</button>
              </div>
            )
          })
        }
      </div>
    )
  }
}
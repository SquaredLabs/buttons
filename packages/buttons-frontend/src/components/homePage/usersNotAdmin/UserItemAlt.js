import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../userList/Users.module.css'



class UserItemAlt extends Component {

  userStyle = (e) => {
    if (this.props.user.LocationId !== null) {
      return styles['activeUser']
    } else {
      return styles['inactiveUser']
    }
  }

  render() {
    return (
      <div className = {this.userStyle()}>
          {this.props.user.name}
      </div>
    )
  }
}

export default UserItemAlt;

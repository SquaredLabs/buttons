import React, { Component } from 'react';
import UserItem from './UserItem';
import PropTypes from 'prop-types';
import styles from './Users.module.css';

class Users extends Component {
  render () {
    return (
      <div className = {styles['users']}>
        <p className = {styles['usersHeader']}>Users</p>
      {this.props.users.map((user) => (
      <UserItem
        key = {user.id}
        user = {user}
        locations = {this.props.locations}
        changeLocHelp = {this.props.changeLocHelp}
      />
    ))}
    </div>
    )
  }
}

export default Users;

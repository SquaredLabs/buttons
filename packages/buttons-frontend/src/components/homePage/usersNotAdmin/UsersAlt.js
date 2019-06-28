import React, { Component } from 'react';
import UserItem from '../userList/UserItem';
import UserInteractive from './UserInteractive'
import UserItemAlt from './UserItemAlt'
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import styles from '../userList/Users.module.css';

class UsersAlt extends Component {

  render () {
    const userId = JSON.parse(atob(Cookies.get('koa:sess'))).user.id

    const currentUser = this.props.users.filter(
      user => user.id === userId
    )

    const otherUsers = this.props.users.filter(
      user => user.id !== userId
      )

    return (
      <div>
      {currentUser.map((user) =>
        <div className = {styles['users']}>
          <p className = {styles['usersHeader']}>Users</p>
          <UserInteractive
            key = {user}
            user = {user}
            locations = {this.props.locations}
            changeLocHelp = {this.props.changeLocHelp}
          />
        {otherUsers.map((user) => (
        <UserItemAlt
          key = {user.id}
          user = {user}
          locations = {this.props.locations}
          changeLocHelp = {this.props.changeLocHelp}
        />
      ))}
      </div>
      )}
      </div>
    )}}

export default UsersAlt;

import React, { Component } from 'react';
import IndivUser from './IndivUser';
import styles from '../AdminEdit.module.css'

class AllUsers extends Component {
  render () {
    return (
      <div className = {styles['entry']}>
        <p className= {styles['entryHeader']}>Edit Users:</p>
        {this.props.users.map((user) =>
          <IndivUser
            key = {user.id}
            user = {user}
            changeUserData = {this.props.changeUserData}
            deleteUser = {this.props.deleteUser}
          />
        )}
      </div>
      )
  }
}

export default AllUsers

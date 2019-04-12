import React, { Component } from 'react';
import IndivUser from './IndivMember';
import styles from '../AdminEdit.module.css'

class AllMembers extends Component {
  render () {
    return (
      <div className = {styles['entry']}>
        <p className= {styles['entryHeader']}>Edit Users:</p>
        {this.props.members.map((member) =>
          <IndivUser
            key = {member.id}
            member = {member}
            changeMemberData = {this.props.changeMemberData}
            deleteUser = {this.props.deleteUser}
          />
        )}
      </div>
      )
  }
}

export default AllMembers

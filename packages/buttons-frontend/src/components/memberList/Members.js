import React, { Component } from 'react';
import MemberItem from './MemberItem';
import PropTypes from 'prop-types';
import styles from './Members.module.css';

class Members extends Component {
  render () {
    return (
      <div className = {styles['members']}>
        <p className = {styles['usersHeader']}>Users</p>
      {this.props.members.map((member) => (
      <MemberItem
        key = {member.id}
        member = {member}
        locations = {this.props.locations}
        changeLocHelp = {this.props.changeLocHelp}
      />
    ))}
    </div>
    )
  }
}

export default Members;

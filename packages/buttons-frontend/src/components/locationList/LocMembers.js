import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Locations.module.css'

class LocMembers extends Component {
  render () {
    return (
      <p className={styles['locMember']}>
        {this.props.locMember.name}
        <button
        className = {styles['leaveButton']}
        onClick = {() => this.props.leaveLocHelp({userId: this.props.locMember.id})}>
          Leave
        </button>
      </p>
    )
  }
}

/*LocMembers.propTypes = {
  locMember: PropTypes.object.isRequired
}*/
export default LocMembers

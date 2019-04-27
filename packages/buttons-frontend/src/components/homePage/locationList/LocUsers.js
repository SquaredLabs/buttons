import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Locations.module.css'

class LocUsers extends Component {

  // getImage = () => {
  //   const img = new Image();
  //   img.src = this.props.locMember.image;
  //   return img
  // }

  render () {
    return (
      <p className={styles['locUser']}>
        <img src= {this.props.locUser.image} height='42' width='42'/>
        {this.props.locUser.name}
        <button
        className = {styles['leaveButton']}
        onClick = {() => this.props.leaveLocHelp({userId: this.props.locUser.id})}>
          Leave
        </button>
      </p>
    )
  }
}

/*LocMembers.propTypes = {
  locMember: PropTypes.object.isRequired
}*/
export default LocUsers

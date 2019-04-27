import React, { Component } from 'react';
import LocUsers from './LocUsers';
import PropTypes from 'prop-types';
import styles from './Locations.module.css'

class LocationItem extends Component {
  render () {
    const locUsers = this.props.users.filter(
      user => user.LocationId === this.props.location.id
    )
    return (
      <div className = {styles['location']}>
        <div className = {styles['indivLocContent']}>
          <p className = {styles['indivLocTitle']}>{this.props.location.name}</p>
        {locUsers.map((user) =>
          <LocUsers
            key = {user.id}
            locUser = {user}
            leaveLoc = {this.props.leaveLoc}
            leaveLocHelp = {this.props.leaveLocHelp}
          />)}
        </div>
    </div>
  )
  }
}


// LocationItem.propTypes = {
//   members: PropTypes.array.isRequired,
//   location: PropTypes.object.isRequired
// }

export default LocationItem

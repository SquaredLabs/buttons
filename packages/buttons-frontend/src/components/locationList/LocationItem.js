import React, { Component } from 'react';
import LocMembers from './LocMembers';
import PropTypes from 'prop-types';
import styles from './Locations.module.css'

class LocationItem extends Component {
  render () {
    const locMembers = this.props.members.filter(
      member => member.LocationId === this.props.location.id
    )
    return (
      <div className = {styles['location']}>
        <p className = {styles['indivLocHeader']}>
          {this.props.location.name}
        </p>
        {locMembers.map((member) =>
          <LocMembers
            key = {member.id}
            locMember = {member}
            leaveLoc = {this.props.leaveLoc}
            leaveLocHelp = {this.props.leaveLocHelp}
          />)}
    </div>
  )
  }
}


// LocationItem.propTypes = {
//   members: PropTypes.array.isRequired,
//   location: PropTypes.object.isRequired
// }

export default LocationItem

import React, { Component } from 'react'
import LocationItem from './LocationItem'
import PropTypes from 'prop-types'
import styles from './Locations.module.css'

class Locations extends Component {
  render () {
    return (
      <div className={styles['locationsAndHeader']}>
        <p className={styles['locationsHeader']}>Locations</p>
        <div className = {styles['locations']}>
          {this.props.locations.map((loc) =>
          <LocationItem
            key = {loc.id}
            location = {loc}
            users = {this.props.users}
            leaveLoc = {this.props.leaveLoc}
            leaveLocHelp = {this.props.leaveLocHelp}
          />
          )}
        </div>
      </div>
    )
  }
}

// Locations.propTypes = {
//   locations: PropTypes.array.isRequired,
//   members: PropTypes.array.isRequired
// }

export default Locations

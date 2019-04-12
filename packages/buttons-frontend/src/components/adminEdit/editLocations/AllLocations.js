import React, { Component } from 'react';
import IndivLoc from './IndivLoc';
import PropTypes from 'prop-types';
import styles from '../AdminEdit.module.css'

class LocationList extends Component {
  render () {
    return (
      <div className = {styles['entry']}>
        <p className= {styles['entryHeader']}>Edit Locations:</p>
        {this.props.locations.map((location) =>
        <IndivLoc
          key = {location.id}
          location = {location}
          changeLocData = {this.props.changeLocData}
          deleteLoc = {this.props.deleteLoc}
        />
        )}
      </div>
    )
  }
}

LocationList.propTypes = {
  locations: PropTypes.array.isRequired,
}

export default LocationList

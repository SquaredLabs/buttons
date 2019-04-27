import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../userList/Users.module.css'



class UserInteractive extends Component {

  buttonStyle = (e, loc) => {
    if (this.props.user.LocationId === loc.id) {
      return styles['selectedButton']
    } else {
      return styles['userButton']
    }
  }

  render() {
    return (
      <div className = {styles['indivUser']}>
          {this.props.user.name}
          <ul className = {styles['nonAdminButtons']}>
          {this.props.locations.map(loc =>
              <button
                className = {this.buttonStyle(this, loc)}
                key = {loc.id}
                onClick={() => this.props.changeLocHelp({userId: this.props.user.id, locId: loc.id})}>
                {loc.name}
              </button>)
          }
          </ul>
      </div>
    )
  }
}


export default UserInteractive

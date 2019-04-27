import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Users.module.css'



class UserItem extends Component {

  buttonStyle = (e, loc) => {
    if (this.props.user.LocationId === loc.id) {
      return styles['selectedButton']
    } else {
      return styles['userButton']
    }
  }

  userStyle = (e) => {
    if (this.props.user.LocationId !== null) {
      return styles['activeUser']
    } else {
      return styles['inactiveUser']
    }
  }

  render() {
    return (
      <div className = {this.userStyle()}>
        <div className = {styles['userInfo']}>
          {this.props.user.name}
          {this.props.locations.map(loc =>
              <button
                className = {this.buttonStyle(this, loc)}
                key = {loc.id}
                onClick={() => this.props.changeLocHelp({userId: this.props.user.id, locId: loc.id})}>
                {loc.name}
              </button>)
          }
          </div>
      </div>
    )
  }
}


// MemberItem.propTypes = {
//   member: PropTypes.object.isRequired,
//   locations: PropTypes.array.isRequired
// }

export default UserItem;

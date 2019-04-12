import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Members.module.css'



class MemberItem extends Component {

  buttonStyle = (e, loc) => {
    if (this.props.member.LocationId === loc.id) {
      return styles['selectedButton']
    } else {
      return styles['memberButton']
    }
  }

  render() {
    return (
      <div className = {styles['indivMember']}>
          {this.props.member.name}
          <ul className={styles['dropdown']}>
          {this.props.locations.map(loc =>
              <button
                className = {this.buttonStyle(this, loc)}
                key = {loc.id}
                onClick={() => this.props.changeLocHelp({userId: this.props.member.id, locId: loc.id})}>
                {loc.name}
              </button>)
          }
          </ul>
      </div>
    )
  }
}


// MemberItem.propTypes = {
//   member: PropTypes.object.isRequired,
//   locations: PropTypes.array.isRequired
// }

export default MemberItem;

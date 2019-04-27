import React, { Component } from 'react';

class Logout extends Component {
  render () {
    {this.props.logoutFunc()}
   return (
     <div>
        <p>You've been logged out</p>
     </div>
   )
 }
}

export default Logout

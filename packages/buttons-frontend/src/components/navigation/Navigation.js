import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'

class Navigation extends Component {
  render () {
    return (
      <div className={styles['navigation']}>
        <NavLink className={styles['navItem']} to='/'>
          Home
        </NavLink>
        <NavLink className={styles['navItem']} to= '/api/auth/login'>
          Log In
        </NavLink>
        <NavLink className={styles['navItem']} to='/admin'>
          Admin
        </NavLink>
      </div>
      )
  }
}

export default Navigation

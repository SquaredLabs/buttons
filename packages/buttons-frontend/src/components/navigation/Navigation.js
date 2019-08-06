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
        <NavLink className={styles['navItem']} to='/admin'>
          Admin
        </NavLink>
        <a href="/api/auth/logout" className={styles['navItem']}>
          Logout
        </a>
      </div>
      )
  }
}

export default Navigation

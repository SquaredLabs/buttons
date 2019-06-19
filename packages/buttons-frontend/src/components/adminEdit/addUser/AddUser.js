import React, { Component } from 'react';
import styles from '../AdminEdit.module.css';

class AddUser extends Component {
  state = {
    netid: "",
    name: "",
    image: "",
    admin: "",
    locId: "",
  }

  onNetIdChange = (e) => {
    this.setState({netid: e.target.value})
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  onImageChange = (e) => {
    const files = e.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.setState({image: e.target.result})
      }
    }

  onAdminChange = (e) => {
    this.setState({admin: e.target.admin})
  }

  onLocIdChange = (e) => {
    this.setState({locId: e.target.locId})
  }

  onSubmit = (e) => {
    this.props.addUser({
      netid: this.state.netid,
      name: this.state.name,
      image: this.state.image,
      administrator: this.state.admin,
      LocactionId: this.state.locId
      })
  }

  render () {
    return (
      <form
        onSubmit = {this.onSubmit}
        className = {styles['entry']}>
        <p className = {styles['entryHeader']}>Add User:</p>
        <div className = {styles['entryInfo']}>
          <label className= {styles['entryInfoItem']}>
            netid:
            <input
              type='text'
              name='netId'
              value= {this.state.netid}
              onChange = {this.onNetIdChange}
              placeholder = 'netId'/>
          </label>
          <label className= {styles['entryInfoItem']}>
            name:
            <input
              type='text'
              name='userName'
              value= {this.state.name}
              onChange = {this.onNameChange}
              placeholder = 'Name'/>
          </label>
          <label className= {styles['entryInfoItem']}>
            image:
            <input
              type='file'
              name='userImage'
              onChange = {this.onImageChange}
              />
          </label>
          <label className= {styles['entryInfoItem']}>
            admin:
            <input
              type='text'
              name='admin'
              value= {this.state.admin}
              onChange = {this.onAdminChange}
              placeholder = '0 = no, 1 = yes'/>
          </label>
          <label className= {styles['entryInfoItem']}>
            Location Id:
            <input
              type='text'
              name='locId'
              value= {this.state.locId}
              onChange = {this.onLocIdChange}
              placeholder = 'Location Id'/>
          </label>
          <input
            className= {styles['entryInfoItem']}
            type='submit'
            value='Add User'
          />
        </div>
      </form>
      )
  }
}

export default AddUser

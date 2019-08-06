import React, { Component } from 'react';
import styles from '../AdminEdit.module.css'

class IndivUser extends Component {
  state = {
    id: this.props.user.id,
    netid: this.props.user.netid,
    name: this.props.user.name,
    image: this.props.user.image,
    administrator: this.props.user.administrator,
    LocationId: this.props.user.LocationId,
  }

  onNetIdChange = (e) => {
    this.setState({netid: e.target.value})
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  onImageChange = (e) => {
    const files = e.target.files;
    console.log(files)

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      console.log(e.target.result)
      this.setState({image: e.target.result})
      }
    }

  onAdminChange = (e) => {
    this.setState({administrator: e.target.value})
  }

  onLocIdChange = (e) => {
    this.setState({LocationId: e.target.value})
  }

  onSubmit = (e) => {
    this.props.changeUserData({
      id: this.props.user.id,
      netid: this.state.netid,
      name: this.state.name,
      image: this.state.image,
      administrator: this.state.administrator,
      LocationId: this.state.LocationId
      })
  }

  onDelete = (e) => {
    this.props.deleteUser({
      id: this.props.user.id
      })
  }




  render () {
    return (
      <form onSubmit = {this.onSubmit} className = {styles['subForm']}>
        <p>User:{this.props.user.name}</p>
        <label className = {styles['formItem']}>
          netid:
          <input
            type='text'
            name='netId'
            value= {this.state.netid}
            onChange = {this.onNetIdChange}
            placeholder = {this.props.user.netid}/>
        </label>
        <label className = {styles['formItem']}>
          name:
          <input
            type='text'
            name='userName'
            value= {this.state.name}
            onChange = {this.onNameChange}
            placeholder = {this.props.user.name}/>
        </label>
        <img
          src= {this.state.image}
          className={styles['cover']}
          height='42' width='42'
        />
        <label className = {styles['formItem']}>
          image:
          <input
            type='file'
            name='userImage'
            //value= {this.state.image
            onChange = {this.onImageChange}
            //placeholder = {this.props.user.image}
            />
        </label>
        <label className = {styles['formItem']}>
          admin:
          <input
            type='number'
            name='admin'
            value= {this.state.administrator}
            onChange = {this.onAdminChange}
            placeholder = {this.props.user.administrator}/>
        </label>
        <label className = {styles['formItem']}>
          Location Id:
          <input
            type='number'
            name='locId'
            value= {this.state.locId}
            onChange = {this.onLocIdChange}
            placeholder = {this.props.user.LocationId}/>
        </label>
        <input
          className = {styles['formItem']}
          type='submit'
          value='Submit Change'
        />
        <button onClick={this.onDelete} className = {styles['formItem']}>
        Delete User
        </button>
      </form>
      )
  }
}

export default IndivUser

import React, { Component } from 'react';
import styles from '../AdminEdit.module.css'

class IndivMember extends Component {
  state = {
    id: this.props.member.id,
    netid: this.props.member.netid,
    name: this.props.member.name,
    image: this.props.member.image,
    administrator: this.props.member.administrator,
    LocationId: this.props.member.LocationId,
  }

  onNetIdChange = (e) => {
    this.setState({netid: e.target.value})
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  onImageChange = (e) => {
    this.setState({image: e.target.value})
  }

  onAdminChange = (e) => {
    this.setState({administrator: e.target.value})
  }

  onLocIdChange = (e) => {
    this.setState({LocationId: e.target.value})
  }

  onSubmit = (e) => {
    this.props.changeMemberData({
      id: this.props.member.id,
      netid: this.state.netid,
      name: this.state.name,
      image: this.state.image,
      administrator: this.state.administrator,
      LocationId: this.state.LocationId
      })
  }

  onDelete = (e) => {
    this.props.deleteUser({
      id: this.props.member.id
      })
  }




  render () {
    return (
      <form onSubmit = {this.onSubmit} className = {styles['subForm']}>
        <p>User:{this.props.member.name}</p>
        <label>
          netid:
          <input
            type='text'
            name='netId'
            value= {this.state.netid}
            onChange = {this.onNetIdChange}
            placeholder = {this.props.member.netid}/>
        </label>
        <label>
          name:
          <input
            type='text'
            name='userName'
            value= {this.state.name}
            onChange = {this.onNameChange}
            placeholder = {this.props.member.name}/>
        </label>
        <label>
          image:
          <input
            type='text'
            name='userImage'
            value= {this.state.image}
            onChange = {this.onImageChange}
            placeholder = {this.props.member.image}/>
        </label>
        <label>
          admin:
          <input
            type='number'
            name='admin'
            value= {this.state.administrator}
            onChange = {this.onAdminChange}
            placeholder = {this.props.member.administrator}/>
        </label>
        <label>
          Location Id:
          <input
            type='number'
            name='locId'
            value= {this.state.locId}
            onChange = {this.onLocIdChange}
            placeholder = {this.props.member.LocationId}/>
        </label>
        <input
          type='submit'
          value='Submit Change'
        />
        <button onClick={this.onDelete}>
        Delete User
        </button>
      </form>
      )
  }
}

export default IndivMember

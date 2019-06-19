import React, { Component } from 'react';
import styles from '../AdminEdit.module.css'

class IndivLoc extends Component {
  state = {
    name: this.props.location.name,
    image: this.props.location.image
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  onImageChange = (e) => {
    this.setState({image: e.target.value})
  }

  onSubmit = (e) => {
    this.props.changeLocData({id: this.props.location.id, name: this.state.name, image: this.state.image})
  }

  onDelete = (e) => {
    this.props.deleteLoc({
      id: this.props.location.id
      })
  }

  render () {
    return (
      <form onSubmit = {this.onSubmit} className = {styles['subForm']}>
        <p>Location ID:{this.props.location.id}</p>
        <br/>
        <label>
          name:
          <input
            type='text'
            name='locName'
            value= {this.state.name}
            onChange = {this.onNameChange}
            placeholder = {this.props.location.name}/>
        </label>
        <label>
          image:
          <input
            type='text'
            name='locImage'
            value = {this.state.image}
            onChange = {this.onImageChange}
            placeholder = {this.props.location.img}/>
        </label>
        <input
          type='submit'
          value='Submit Change'/>
        <button onClick = {this.onDelete}>
          Delete Location
        </button>
      </form>
    )
  }
}

export default IndivLoc
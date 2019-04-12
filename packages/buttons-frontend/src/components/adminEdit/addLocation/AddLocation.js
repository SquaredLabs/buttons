import React, { Component } from 'react';
import styles from '../AdminEdit.module.css'

class AddLocation extends Component {
  state = {
    name: '',
    image: ''
  }

  onNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  onImageChange = (e) => {
    this.setState({image: e.target.value})
  }

  onSubmit = (e) => {
    this.props.addLocation({name: this.state.name, image: this.state.image})
  }

  render () {
    return (
      <form
        onSubmit = {this.onSubmit}
        className = {styles['entry']}
        >
        <p className= {styles['entryHeader']}>Add Location:</p>
        <div className = {styles['entryInfo']}>
          <label className= {styles['entryInfoItem']}>
            name:
            <input
              type='text'
              name='locName'
              placeholder = 'Name'
              value= {this.state.name}
              onChange = {this.onNameChange}
              />
          </label>
          <label className= {styles['entryInfoItem']}>
            image:
            <input
              type='text'
              name='locImage'
              placeholder = 'Image'
              value = {this.state.image}
              onChange = {this.onImageChange}
              />
          </label>
          <input
            className= {styles['entryInfoItem']}
            type='submit'
            value='Add Location'/>
        </div>
      </form>
    )
}
}

export default AddLocation;

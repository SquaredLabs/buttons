import React, { Component } from 'react';
import './App.css';
import Members from './components/memberList/Members';
import Locations from './components/locationList/Locations';
import AllLocations from './components/adminEdit/editLocations/AllLocations';
import AllMembers from './components/adminEdit/editUsers/AllMembers';
import Navigation from './components/navigation/Navigation';
import AddUser from './components/adminEdit/addUser/AddUser';
import AddLocation from './components/adminEdit/addLocation/AddLocation';
import Error from './components/error/Error';
import Cookies from 'js-cookie';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

function getSession() {
  return JSON.parse(atob(Cookies.get('koa:sess')))
}

async function getUsers () {
  const url = '/api/users'
  const res = await fetch(url, {
    method: 'GET',
    headers: {
        'X-CSRF-Token': getSession().csrfToken
    }
  })
  return (await res.json())
}

async function getLocations () {
  const url = '/api/locations'
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-CSRF-Token': getSession().csrfToken
    }
  })
  return (await res.json())
}

async function changeLoc(user) {
  // console.log(user.locId)
  // console.log(user.userId)
  const url = '/api/users/' + user.userId
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getSession().csrfToken
    },
    body: JSON.stringify({
      LocationId: user.locId
    })
    //how should I also make this update the state as well?
})
}



async function leaveLoc(user) {
  const url = '/api/users/' + user.userId
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getSession().csrfToken
    },
    body: JSON.stringify({
      LocationId: null
      })
    })
}

async function changeLocData(location) {
  const url = '/api/locations/' + location.id
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getSession().csrfToken
    },
    body: JSON.stringify({
        name: location.name,
        image: location.image,
      })
    })
}

async function changeMemberData(user) {
  console.log(user.name)
  const url = '/api/users/' + user.id
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getSession().csrfToken
    },
    body: JSON.stringify({
        netid: user.netid,
        name: user.name,
        image: user.image,
        administrator: user.administrator,
        LocationId: user.LocationId
      })
    })
}

async function addUser(user) {
  const url = '/api/users'
  const res = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getSession().csrfToken
    },
    body: JSON.stringify({
      netid: user.netid,
      name: user.name,
      image: user.image,
      administrator: user.administrator,
      LocationId: user.LocationId
  })
})
}

async function addLocation(location) {
  const url = '/api/locations'
  const res = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getSession().csrfToken
    },
    body: JSON.stringify({
      name: location.name,
      image: location.image
  })
})
}

async function deleteUser(user) {
  const url = '/api/users/' + user.id
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'X-CSRF-Token': getSession().csrfToken
    }
    })
  return (await res.json())
}

async function deleteLoc(loc) {
  const url = '/api/locations/' + loc.id
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'X-CSRF-Token': getSession().csrfToken
    }
    })
  return (await res.json())
}


class App extends Component {
  state = {
    members: [],
    locations: []
  }

  async componentDidMount () {
    this.setState({locations: await getLocations(), members: await getUsers()})
  }

  changeLocHelp = (user) => {
    {changeLoc(user)}
    this.setState({members: this.state.members.map(member => {
      if (member.id === user.userId) {
        member.LocationId = user.locId
      }
      return member
    })
  })
  }

leaveLocHelp = (user) => {
  {leaveLoc(user)}
  this.setState({members: this.state.members.map(member => {
    if (member.id === user.userId) {
      member.LocationId = 0
    }
    return member
  })
})
}

  HomePage = () => {
    return (
      <div className = {styles['everything']}>
        <h1>Where To Work</h1>
        <div className = {styles['membersLocationsContainer']}>
          <Members
            locations = {this.state.locations}
            members = {this.state.members}
            changeLocHelp = {this.changeLocHelp}
          />
          <Locations
            members = {this.state.members}
            locations = {this.state.locations}
            leaveLoc = {leaveLoc}
            leaveLocHelp = {this.leaveLocHelp}
          />
        </div>
      </div>
      )
  }

  Error = () => {
    return (
      <div className = {styles['everything']}>
        <Error/>
      </div>
      )
  }

  AdminPage = () => {
    return (
      <div className = {styles['everything']}>
        <AddUser
          addUser = {addUser}
        />
        <AddLocation
          addLocation = {addLocation}
        />
        <AllLocations
          locations = {this.state.locations}
          changeLocData = {changeLocData}
          deleteLoc = {deleteLoc}
        />
        <AllMembers
          members = {this.state.members}
          changeMemberData = {changeMemberData}
          deleteUser = {deleteUser}
        />
      </div>
      )
  }

  render () {
    return (
      <BrowserRouter>
        <div className = {styles['background']}>
          <Navigation />
          <Switch>
            <Route path='/' component = {this.HomePage} exact />
            <Route path='/admin' component = {this.AdminPage} />
            <Route component={this.Error} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

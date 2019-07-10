import React, { Component } from 'react';
import './App.css';
import Users from './components/homePage/userList/Users';
import Locations from './components/homePage/locationList/Locations';
import AllLocations from './components/adminEdit/editLocations/AllLocations';
import AllUsers from './components/adminEdit/editUsers/AllUsers';
import Navigation from './components/navigation/Navigation';
import AddUser from './components/adminEdit/addUser/AddUser';
import AddLocation from './components/adminEdit/addLocation/AddLocation';
import Error from './components/error/Error';
import UsersAlt from './components/homePage/usersNotAdmin/UsersAlt';
import NoAccess from './components/adminEdit/noAccess/NoAccess';
// import Logout from './components/logout/Logout';
import Cookies from 'js-cookie';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// Various functions that change user/location database info

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
  try {
  return (await res.json())
}
  catch(err) {
    console.log(err + 'Error with get Users')
  }
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
})
}



async function leaveLoc(user) {
  const url = '/api/users/' + user.userId + '/LocationId'
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'X-CSRF-Token': getSession().csrfToken
    },
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

async function changeUserData(user) {
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
  const result = window.confirm('Are you sure you want to delete this user?')
  if (result) {
    const url = '/api/users/' + user.id
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': getSession().csrfToken
      }
      })
    return (await res.json())
  }
}

async function deleteLoc(loc) {
  const result = window.confirm('Are you sure you want to delete this location?')
  if (result) {
    const url = '/api/locations/' + loc.id
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': getSession().csrfToken
      }
      })
    return (await res.json())
  }
}

// function logoutFunc() {
//   Cookies.remove('koa:sess', {path: '/'});
// }
// window.Cookies = Cookies


//Class App begins

class App extends Component {
  state = {
    users: [],
    locations: [],
    loaded: false
  }

  async componentDidMount () {
    this.setState({locations: await getLocations(), users: await getUsers(), loaded: true})
  }

//Changes state directly and calls db function
  changeLocHelp = (user) => {
    {changeLoc(user)}
    this.setState({users: this.state.users.map(member => {
      if (member.id === user.userId) {
        member.LocationId = user.locId
      }
      return member
    })
  })
  }

//Changes state directly and calls db function
leaveLocHelp = (user) => {
  {leaveLoc(user)}
  this.setState({users: this.state.users.map(member => {
    if (member.id === user.userId) {
      member.LocationId = null
    }
    return member
  })
})
}


//Page specifications
//if the user is an admin, the home page will look different than if they are not
  HomePage = () => {
    if (((JSON.parse(atob(Cookies.get('koa:sess')))).user.administrator) === true) {
      return (
        <div>
          <h1>Where To Work</h1>
          <div className = {styles['usersLocationsContainer']}>
            <Users
              locations = {this.state.locations}
              users = {this.state.users}
              changeLocHelp = {this.changeLocHelp}
            />
            <Locations
              users = {this.state.users}
              locations = {this.state.locations}
              leaveLoc = {leaveLoc}
              leaveLocHelp = {this.leaveLocHelp}
            />
          </div>
        </div>
        )
      } else {
        return (
          <div>
            <h1>Where to Work</h1>
            <div className= {styles['usersLocationsContainer']}>
              <UsersAlt
                locations = {this.state.locations}
                users = {this.state.users}
                changeLocHelp = {this.changeLocHelp}
              />
              <Locations
                users = {this.state.users}
                locations = {this.state.locations}
                leaveLoc = {leaveLoc}
                leaveLocHelp = {this.leaveLocHelp}
              />
            </div>
          </div>
          )
      }
  }

  Error = () => {
    return (
      <div>
        <Error/>
      </div>
      )
  }

  // Logout = () => {
  //   return (
  //     <Logout
  //       logoutFunc = {logoutFunc}
  //     />
  //     )
  // }

  AdminPage = () => {
    if (((JSON.parse(atob(Cookies.get('koa:sess')))).user.administrator) !== true) {
      return (
        <NoAccess/>
        )
    }
    return (
      <div className>
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
        <AllUsers
          users = {this.state.users}
          changeUserData = {changeUserData}
          deleteUser = {deleteUser}
        />
      </div>
      )
  }

  render () {
    if (this.state.loaded === false) {
      return (
        <div>
          <div className = {styles['loadingItem']}></div>
          <div className = {styles['loadingItem2']}></div>
        </div>
        )
    } else {
      return (
        <BrowserRouter>
          <div className = {styles['background']}>
            <Navigation />
            <Switch>
              <Route path='/' component = {this.HomePage} exact />
              <Route path='/admin' component = {this.AdminPage} />
              // <Route path ='/logout' component={this.Logout}/>
              <Route component={this.Error} />
            </Switch>
          </div>
        </BrowserRouter>
      )
    }
  }
}

export default App;

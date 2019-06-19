import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Cookies from 'js-cookie';

const koacookie = Cookies.get('koa:sess')
if (!koacookie || JSON.parse(atob(koacookie)).netid === undefined) {
  window.reload = true
  window.location = '/api/auth/login'
} else {
  console.log(JSON.parse(atob(koacookie)) )
  ReactDOM.render(<App />, document.getElementById('root'))
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
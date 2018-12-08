import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

import MainApp from './App.js';
class AuthWrapper extends React.Component {
  rerender = () => this.forceUpdate();
  render() {
    return <MainApp rerender={this.rerender} />;
  }
}

ReactDOM.render(<AuthWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

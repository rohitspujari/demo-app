import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

import App from './App';
// class AuthWrapper extends React.Component {
//   rerender = () => this.forceUpdate();
//   render() {
//     return <MainApp rerender={this.rerender} />;
//   }
// }
//Amplify React Native auth.signout() does not return to Sign In page
//https://github.com/aws-amplify/amplify-js/issues/1529
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

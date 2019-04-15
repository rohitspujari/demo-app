import React, { Component, useState, useEffect } from 'react';
import './App.css';
import Amplify, {
  Analytics,
  Storage,
  Auth,
  API,
  Hub,
  Logger,
  graphqlOperation
} from 'aws-amplify';
import aws_exports from './aws-exports';
import { withStyles } from '@material-ui/core/styles';
import { withAuthenticator, Authenticator, Greetings } from 'aws-amplify-react';

import { ThemeProvider } from '@material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//import orange from '@material-ui/core/colors/orange';

import AppBar from './Components/NavigationBar';
import ProjectGrid from './Components/ProjectGrid';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { Redirect } from 'react-router';

////IMPORT PROJECTS////
import projectList from './Projects/projects.json';
import WordInsightsApp from './Projects/WordInsights';
import Comprehend from './Projects/Comprehend';
import Sagemaker from './Projects/Sagemaker';
import GraphQLDemo from './Projects/GraphQLDemo';
import SplunkPricing from './Projects/SplunkPricing';
import Rekognition from './Projects/Rekognition';
import Details from './Projects/Rekognition/Details';
import Test from './Projects/Rekognition/Test';

Amplify.configure(aws_exports);
let appSyncConfig = {
  aws_appsync_authenticationType: 'AWS_IAM'
};
Amplify.configure(appSyncConfig);

export const UserContext = React.createContext();

const federated = {
  google_client_id:
    '277830869306-2c0r1esgjnjauug9koe5sodvh97uv419.apps.googleusercontent.com' // Enter your google_client_id here
  //facebook_app_id: '', // Enter your facebook_app_id here
  //amazon_client_id: '' // Enter your amazon_client_id here
};
//Amplify.Logger.LOG_LEVEL = 'DEBUG';
//const logger = new Logger('main');

const authWatcher = new Logger('auth_watcher');

const theme = createMuiTheme({
  palette: {
    primary: { main: '#232f3e' },
    secondary: { main: '#11cb5f' }
  },
  typography: {
    useNextVariants: true
  },
  root: {
    padding: 20,
    flexGrow: 1
  }
});

const authenticatorTheme = {
  //signInButtonIcon: { display: 'none' },
  googleSignInButton: { backgroundColor: '#232f3e', borderColor: '#232f3e' },
  button: { backgroundColor: '#232f3e' }
};

function App() {
  authWatcher.onHubCapsule = capsule => {
    switch (capsule.payload.event) {
      case 'signIn':
        //console.log('signIn');
        getUserData();
        authWatcher.error('user signed in'); //[ERROR] auth_watcher - user signed in
        break;
      case 'signUp':
        //authWatcher.error('user signed up');
        break;
      case 'signOut':
        //console.log('signOut');
        setUser(null);
        //authWatcher.error('user signed out');
        break;
      case 'signIn_failure':
        authWatcher.error('user sign in failed');
        break;
      case 'configured':
        authWatcher.error('the Auth module is configured');
      default:
        break;
    }
  };

  const [user, setUser] = useState(null);

  const getUserData = async () => {
    // logger.debug('print_auth', Auth);
    const authedUser = await Auth.currentAuthenticatedUser({
      //bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });
    //logger.debug(authedUser);
    //console.log('auth_user', authedUser);
    //console.log('currentAuthenticatedUser', authedUser);
    //console.log('cureentUserCreds', await Auth.authedUserCredentials());
    var user = {};
    if (authedUser.username) {
      // cognito User
      user.name = authedUser.username;
      user.id = (await Auth.currentUserCredentials()).data.IdentityId;
      user.email = authedUser.attributes.email;
      user.type = 'cognito';
      user.sub = authedUser.attributes.sub;
    } else if (authedUser.name) {
      // federated user
      user.name = authedUser.name;
      user.id = authedUser.id;
      user.email = authedUser.email;
      user.type = 'federated';
    }

    const {
      data: { getUser: result }
    } = await API.graphql(graphqlOperation(queries.getUser, { id: user.id }));
    if (!result) {
      // if user is not present add user
      await API.graphql(
        graphqlOperation(mutations.createUser, { input: user })
      );
    }

    setUser(user);
  };
  const logOut = async () => {
    await Auth.signOut();
  };

  useEffect(() => {
    Hub.listen('auth', authWatcher);
    getUserData();
  }, []);

  return !user ? (
    <Authenticator
      theme={authenticatorTheme}
      federated={federated}
      hide={[Greetings]}
    />
  ) : (
    <UserContext.Provider value={user}>
      <div className="App">
        <Router>
          <MuiThemeProvider theme={theme}>
            {/* NAVIGATION BAR ROUTE - ALWAYS ON */}
            <Route
              path="/"
              render={props => (
                <AppBar username={user.name} logout={logOut} {...props} />
              )}
            />
            {/* MAIN ROUTE */}
            <Route
              exact
              path="/"
              render={props => (
                <ProjectGrid projectList={projectList} {...props} />
              )}
            />
            {/* REGISTER PROJECT ROUTES */}
            <Route path="/wordinsights" component={WordInsightsApp} />
            <Route path="/comprehend" component={Comprehend} />
            <Route path="/sagemaker" component={Sagemaker} />
            {/* <Route path="/graphqldemo" component={GraphQLDemo} /> */}
            {/* <Route path="/splunkpricing" component={SplunkPricing} /> */}
            <Route
              path="/splunkpricing"
              render={props => <SplunkPricing user={user} />}
            />
            <Route exact path="/rekognition" component={Rekognition} />
            <Route exact path="/rekognition/details" component={Details} />
            <Route exact path="/test" component={Test} />

            {/* <Route path="/rekognition/:fileId" component={File} /> */}
            {/* <Route
              path="/rekognition/details"
              render={props => <Details user={user} {...props} />}
            /> */}
          </MuiThemeProvider>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;

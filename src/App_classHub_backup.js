import React, { Component } from 'react';
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
import File from './Projects/Rekognition/File';

Amplify.configure(aws_exports);
let appSyncConfig = {
  aws_appsync_authenticationType: 'AWS_IAM'
};
Amplify.configure(appSyncConfig);

const federated = {
  google_client_id:
    '277830869306-2c0r1esgjnjauug9koe5sodvh97uv419.apps.googleusercontent.com' // Enter your google_client_id here
  //facebook_app_id: '', // Enter your facebook_app_id here
  //amazon_client_id: '' // Enter your amazon_client_id here
};
//Amplify.Logger.LOG_LEVEL = 'DEBUG';
//const logger = new Logger('main');

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
  //googleSignInButton: { backgroundColor: 'red', borderColor: 'red' },
  button: { backgroundColor: '#232f3e' }
};

class App extends Component {
  state = {
    user: null
  };

  getUserData = async () => {
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
    this.setState({ user });
    //console.log(result);

    // const filter = {
    //   filter: {
    //     id: {
    //       eq: 'us-east-1:08ab9fe2-c99d-4f2f-b885-9c4abd198973'
    //     }
    //   }
    // };
    // console.log(await API.graphql(graphqlOperation(queries.listUsers, filter)));
    //console.log(await API.graphql(graphqlOperation(queries.listUsers)));
  };

  onHubCapsule = capsule => {
    console.log(capsule);
    switch (capsule.payload.event) {
      case 'signIn':
        this.getUserData();
        console.log('user signed in');
        break;
      case 'signUp':
        console.log('user signed up');
        break;
      case 'signOut':
        this.setState({ user: null });
        console.log('user signed out');
        break;
      case 'signIn_failure':
        console.log('user sign in failed');
        break;
      case 'configured':
        console.log('the Auth module is configured');
        break;
      default:
        break;
    }
  };

  logOut = async () => {
    await Auth.signOut();
  };

  componentDidMount() {
    Hub.listen('auth', this, 'onHubCapsule');
    this.getUserData();
  }

  render() {
    //console.log(Auth.user);
    const { user } = this.state;

    return !user ? (
      <Authenticator
        theme={authenticatorTheme}
        federated={federated}
        hide={[Greetings]}
      />
    ) : (
      <div className="App">
        <Router>
          <MuiThemeProvider theme={theme}>
            {/* NAVIGATION BAR ROUTE - ALWAYS ON */}
            <Route
              path="/"
              render={props => (
                <AppBar username={user.name} logout={this.logOut} {...props} />
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
            <Route path="/splunkpricing" component={SplunkPricing} />
            <Route
              exact
              path="/rekognition"
              render={props => (
                <Rekognition user={this.state.user} history={props.history} />
              )}
            />
            {/* <Route path="/rekognition/:fileId" component={File} /> */}
            <Route
              path="/rekognition/:id"
              render={props => <File user={this.state.user} {...props} />}
            />
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}

export default App;

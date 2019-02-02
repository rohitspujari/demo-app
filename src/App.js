import React, { Component } from 'react';
import './App.css';
import Amplify, {
  Analytics,
  Storage,
  Auth,
  API,
  Logger,
  graphqlOperation
} from 'aws-amplify';
import aws_exports from './aws-exports';
import { withStyles } from '@material-ui/core/styles';
import { withAuthenticator } from 'aws-amplify-react';
import Grid from '@material-ui/core/Grid';
//https://codesandbox.io/s/zr1mjxxpq4
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
Amplify.configure(aws_exports);

//Amplify CLI doesn't automatically configure AWS_IAM authentication mode for graphql. The defualt auth mode is cognito user pool.
//Congnito user pool restricts the graphql endpoint access through web apps only. To enable accessing graphql
//endpoint from other services like lambda, we need to customize the authentication, and set the authRole on cognito identity pool.
//the auth role should have permission to invoke required graphql api
//http://sandny.com/2018/09/24/appsync-graphql-amplify-iam/

let myAppConfig = {
  aws_appsync_authenticationType: 'AWS_IAM'
};
Amplify.configure(myAppConfig);
//Amplify.Logger.LOG_LEVEL = 'DEBUG';
const logger = new Logger('main');

Storage.configure({ level: 'private' });

const styles = {
  root: {
    padding: 20,
    flexGrow: 1
  }
};

const theme = createMuiTheme({
  palette: {
    primary: { main: '#232f3e' },
    secondary: { main: '#11cb5f' } // This is just green.A700 as hex.
  },
  typography: {
    useNextVariants: true
  },
  root: {
    padding: 20,
    flexGrow: 1
  }
});

class App extends Component {
  state = {
    user: ''
  };
  // state = {
  //   authState: 'SignIn'
  // };
  uploadFile = evt => {
    const file = evt.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      this.setState({ file: name });
    });
  };

  checkAndAddUser = async () => {
    logger.debug('print_auth', Auth);
    const currentUser = await Auth.currentAuthenticatedUser({
      //bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });
    //logger.debug(currentUser);
    //console.log('auth_user', currentUser);

    //console.log('currentAuthenticatedUser', currentUser);

    //console.log('cureentUserCreds', await Auth.currentUserCredentials());
    var user = {};
    if (currentUser.username) {
      // cognito User
      user.name = currentUser.username;
      user.id = (await Auth.currentUserCredentials()).data.IdentityId;
      user.email = currentUser.attributes.email;
      user.type = 'cognito';
      user.sub = currentUser.attributes.sub;
    } else if (currentUser.name) {
      // federated user
      user.name = currentUser.name;
      user.id = currentUser.id;
      user.email = currentUser.email;
      user.type = 'federated';
    }

    //console.log('user', user);
    //const user = '';
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

  componentDidMount() {
    this.checkAndAddUser();
    //  console.log(user);
  }

  logOut = async () => {
    await Auth.signOut();
    this.props.rerender();
  };

  render() {
    //console.log(Auth.user);
    const { classes } = this.props;
    return (
      <div className="App">
        <Router>
          <MuiThemeProvider theme={theme}>
            {/* <div
              //className={theme.container}
              style={{
                padding: 20
              }}
            > */}
            <Grid container className={classes.root}>
              <Grid item xs={12}>
                {/* NAVIGATION BAR ROUTE - ALWAYS ON */}
                <Route
                  path="/"
                  render={props => (
                    <AppBar
                      username={Auth.user.username || Auth.user.name}
                      logout={this.logOut}
                      {...props}
                    />
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
                <Route path="/graphqldemo" component={GraphQLDemo} />
                <Route path="/splunkpricing" component={SplunkPricing} />
                <Route
                  path="/rekognition"
                  render={props => <Rekognition user={this.state.user} />}
                />
              </Grid>
            </Grid>
            {/* </div> */}
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}

export default props => {
  const MyTheme = {
    //signInButtonIcon: { display: 'none' },
    //googleSignInButton: { backgroundColor: 'red', borderColor: 'red' },
    button: { backgroundColor: '#232f3e' }
  };

  const federated = {
    google_client_id:
      '277830869306-2c0r1esgjnjauug9koe5sodvh97uv419.apps.googleusercontent.com' // Enter your google_client_id here
    //facebook_app_id: '', // Enter your facebook_app_id here
    //amazon_client_id: '' // Enter your amazon_client_id here
  };

  const AppComponent = withAuthenticator(
    withStyles(styles)(App),
    false,
    [],
    null,
    MyTheme
  );

  return <AppComponent federated={federated} {...props} />;
  //return <AppComponent {...props} />;
};

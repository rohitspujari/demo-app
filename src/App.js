import React, { Component } from 'react';
import './App.css';
import Amplify, { Analytics, Storage, Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//import orange from '@material-ui/core/colors/orange';

import AppBar from './Components/NavigationBar';
import ProjectGrid from './Components/ProjectGrid';

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

Storage.configure({ level: 'private' });

const theme = createMuiTheme({
  palette: {
    //primary: { main: orange[400] },
    primary: { main: '#232f3e' },
    secondary: { main: '#11cb5f' } // This is just green.A700 as hex.
  },
  typography: {
    useNextVariants: true
  },
  root: {
    padding: 20
  }
});

class App extends Component {
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

  componentDidMount() {
    Analytics.record('Amplify_CLI');
  }

  logOut = async () => {
    await Auth.signOut();
    this.props.rerender();
  };

  render() {
    //console.log(Auth.user);
    return (
      <div className="App">
        <Router>
          <MuiThemeProvider theme={theme}>
            <div
              //className={theme.container}
              style={{
                padding: 20
              }}
            >
              {/* NAVIGATION BAR ROUTE - ALWAYS ON */}
              <Route
                path="/"
                render={props => (
                  <AppBar
                    username={Auth.user.username}
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
              <Route path="/rekognition" component={Rekognition} />
            </div>
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
  const AppComponent = withAuthenticator(App, false, [], null, MyTheme);
  return <AppComponent {...props} />;
};

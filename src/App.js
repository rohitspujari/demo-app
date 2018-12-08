import React, { Component } from 'react';
import './App.css';
import Amplify, {
  Analytics,
  Storage,
  API,
  graphqlOperation,
  Auth
} from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';

import AppBar from './Components/NavigationBar';
import ProjectGrid from './Components/ProjectGrid';

import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { Redirect } from 'react-router';

////IMPORT PROJECTS////
import projectList from './Projects/projects.json';
import WordInsightsApp from './Projects/WordInsights';
import Comprehend from './Projects/Comprehend';
import Sagemaker from './Projects/Sagemaker';

Amplify.configure(aws_exports);
Storage.configure({ level: 'private' });

const theme = createMuiTheme({
  palette: {
    primary: { main: orange[400] },
    secondary: { main: '#11cb5f' } // This is just green.A700 as hex.
  },
  typography: {
    useNextVariants: true
  }
});

const listTodos = `query listTodos {
  listTodos{
    items{
      id
      name
      description
    }
  }
}`;

const addTodo = `mutation createTodo($name:String! $description: String!) {
  createTodo(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`;

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

  todoMutation = async () => {
    const todoDetails = {
      name: 'Party tonight!',
      description: 'Amplify CLI rocks!'
    };

    const newEvent = await API.graphql(graphqlOperation(addTodo, todoDetails));
    alert(JSON.stringify(newEvent));
  };

  listQuery = async () => {
    console.log('listing todos');
    const allTodos = await API.graphql(graphqlOperation(listTodos));
    alert(JSON.stringify(allTodos));
  };

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
              style={{
                padding: 10
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
            </div>
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}

export default props => {
  const AppComponent = withAuthenticator(App);
  return <AppComponent {...props} />;
};

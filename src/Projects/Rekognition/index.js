import React, { Component } from 'react';
import Webcam from 'react-webcam';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import WebcamCapture from './components/WebcamCapture';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import { PhotoPicker } from 'aws-amplify-react';
//import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 10,
    right: 10
    //width: 300
    //border: 3px solid #73AD21;
  },
  input: {
    display: 'none'
  },
  root: {
    flexGrow: 1
  },
  button: {
    // margin: theme.spacing.unit
  },
  paper: {
    //padding: theme.spacing.unit * 2,
    textAlign: 'center'
    //color: theme.palette.text.secondary
  }
});

class Rekognition extends Component {
  render() {
    const { classes } = this.props;

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    };
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} className={classes.paper}>
            <input
              id="myinput"
              //display="none"
              className={classes.input}
              type="file"
              name=""
              ref={ref => {
                this.myinput = ref;
              }}
              accept="image/*"
            />

            <Fab
              onClick={() => this.myinput.click()}
              color="primary"
              aria-label="Add"
              className={classes.fab}
            >
              <AddIcon />
            </Fab>
            {/* <Button variant="outlined" onClick={() => this.myinput.click()}>
              Default
            </Button> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Rekognition);

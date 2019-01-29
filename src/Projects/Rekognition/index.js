import React, { Component, useRef } from 'react';
import Amplify, { Storage } from 'aws-amplify';
import Webcam from 'react-webcam';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/styles';

import WebcamCapture from './components/WebcamCapture';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import { PhotoPicker } from 'aws-amplify-react';
//import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  fab: {
    //margin: theme.spacing.unit,
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
}));

function Rekognition({ theme }) {
  const classes = useStyles();
  const myinput = useRef();

  console.log(theme);

  const handleChange = e => {
    const file = e.target.files[0];
    const extension = file.name.split('.')[file.name.split('.').length - 1];
    console.log(extension);
    Storage.put(file.name, file, {
      level: 'private',
      contentType: `image/${extension}`
    })
      .then(result => console.log(result))
      .catch(err => console.log(err));
    // use html function click instead of onClick/onclick
  };

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
            className={classes.input}
            type="file"
            name="hello"
            ref={myinput}
            onChange={handleChange}
            onClick={() => {
              console.log('Im clicked');
            }}
            accept="*/*"
          />

          <Fab
            onClick={() => myinput.current.click()}
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

export default Rekognition;

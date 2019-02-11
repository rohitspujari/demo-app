import React, { useRef, useContext } from 'react';

import Webcam from 'react-webcam';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/CameraAlt';
import { makeStyles, useTheme } from '@material-ui/styles';

import WebcamCapture from './components/WebcamCapture';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import { PhotoPicker } from 'aws-amplify-react';

//import Paper from '@material-ui/core/Paper';
//const ListComponent = lazy(() => import('./components/ListComponent'));
import ListComponent from './components/ListComponent';
import useUserFiles from './hooks/useUserFiles';

import { UserContext } from '../../App';

const useStyles = makeStyles(theme => ({
  fab: {
    //margin: theme.spacing.unit,
    position: 'fixed',
    bottom: 10,
    right: 10
  },
  input: {
    display: 'none'
  },
  root: {
    flexGrow: 1,
    margin: 20
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

function Rekognition() {
  const classes = useStyles();
  const myinput = useRef();
  const user = useContext(UserContext);

  const {
    S3Files,
    hasMore,
    getUserObjects,
    removeUserObject,
    uploadFiles,
    progress
  } = useUserFiles(user.id);
  console.log(' --- render ----', S3Files.length);

  const handleUpload = async e => {
    uploadFiles(e);
  };

  // const videoConstraints = {
  //   width: 1280,
  //   height: 720,
  //   facingMode: 'user'
  // };
  return (
    <div className={classes.root}>
      {/* <Suspense fallback={<h1>Loading...</h1>}> */}
      <ListComponent
        files={S3Files}
        fetchMoreData={getUserObjects}
        deleteItem={removeUserObject}
        hasMore={hasMore}
      />
      {/* </Suspense> */}
      <input
        id="myinput"
        multiple
        className={classes.input}
        type="file"
        name="hello"
        ref={myinput}
        onChange={handleUpload}
        onClick={() => {
          //console.log('Im clicked');
        }}
        accept="*/*"
      />

      <Fab
        //use html function click instead of onClick/onclick
        onClick={() => myinput.current.click()}
        color="primary"
        aria-label="Add"
        className={classes.fab}
      >
        {progress || <AddIcon />}
      </Fab>
    </div>
  );
}

export default Rekognition;

import React, { Component, useRef, useState, useEffect } from 'react';
import Amplify, { Storage, API, graphqlOperation } from 'aws-amplify';

import Webcam from 'react-webcam';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/CameraAlt';
import { makeStyles, useTheme } from '@material-ui/styles';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';

import WebcamCapture from './components/WebcamCapture';
import Input from '@material-ui/core/Input';
import Fab from '@material-ui/core/Fab';
import { PhotoPicker } from 'aws-amplify-react';
import { listObjects } from '../../graphql/queries';
//import Paper from '@material-ui/core/Paper';
import ListComponent from './components/ListComponent';

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

function Rekognition({ user }) {
  const classes = useStyles();
  const myinput = useRef();

  const [s3files, setS3Files] = useState([]);
  const [progress, setProgress] = useState(null);

  const getUser = async userId => {
    const { data } = await API.graphql(
      graphqlOperation(queries.getUser, {
        id: userId
      })
    );

    setS3Files(data.getUser.objects.items);
    //console.log(items);
  };

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateObject)
    ).subscribe({
      next: ({
        value: {
          data: { onCreateObject: newItem }
        }
      }) => {
        setS3Files(prev => {
          return [...prev, newItem];
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(
    () => {
      if (user) {
        getUser(user.id);
      }
    },
    [user]
  );

  //console.log(user);

  const generateId = () => {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };

  const handleChange = async e => {
    const file = e.target.files[0];
    const prefix = file.type.split('/')[0];
    const fileId = generateId();
    //const extension = file.name.split('.')[file.name.split('.').length - 1];
    //console.log(file);
    const result = await Storage.put(`${prefix}/${fileId}`, file, {
      level: 'private',
      contentType: file.type,
      progressCallback(progress) {
        //console.log(`Uploaded: ${progress.loaded / progress.total}`);
        const percentProgress = Math.floor(
          (progress.loaded / progress.total) * 100
        );
        if (percentProgress < 100) {
          setProgress(`${percentProgress}%`);
        } else {
          setProgress(null);
        }
      }
    });
    if (result) {
      //console.log(user, fileId, file.name, prefix);
      const res = await API.graphql(
        graphqlOperation(mutations.createObject, {
          input: {
            s3Key: fileId,
            name: file.name,
            prefix: prefix,
            objectCreatedById: user.id //check graphQL query console to get this ID
          }
        })
      );
      console.log(res);
    }
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user'
  };
  return (
    <div className={classes.root}>
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
        //use html function click instead of onClick/onclick
        onClick={() => myinput.current.click()}
        color="primary"
        aria-label="Add"
        className={classes.fab}
      >
        {progress || <AddIcon />}
      </Fab>

      <ListComponent files={s3files} />
    </div>
  );
}

export default Rekognition;

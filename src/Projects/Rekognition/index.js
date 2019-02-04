import React, {
  Component,
  useRef,
  useState,
  useEffect,
  Suspense,
  lazy
} from 'react';
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
//const ListComponent = lazy(() => import('./components/ListComponent'));
import ListComponent from './components/ListComponent';
import { set } from 'immutable';
import { CognitoAccessToken } from 'amazon-cognito-identity-js';

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

const fetchUserObjects = `query GetUser($id: ID!, $nextToken: String) {
  getUser(id: $id) {
    id
    name
    email
    type
    sub
    createdAt
    objects (nextToken: $nextToken, limit: 10) {
      items {
        id
        key
        name
        prefix
        createdAt
      }
      nextToken
    }
  }
}`;

function Rekognition({ user }) {
  const classes = useStyles();
  const myinput = useRef();

  const [s3files, setS3Files] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [progress, setProgress] = useState(null);

  const getUserObjects = async () => {
    if (hasMore) {
      const { data } = await API.graphql(
        graphqlOperation(fetchUserObjects, {
          id: user.id,
          nextToken
        })
      );

      //console.log(data);

      const existingIDs = s3files.map(s => s.id); // remove ids that arrived through subscription
      const filteredItems = data.getUser.objects.items.filter(
        f => !existingIDs.includes(f.id)
      );

      const updatedItems = [...s3files, ...filteredItems];
      setS3Files(updatedItems);
      if (data.getUser.objects.nextToken === null) {
        setHasMore(false);
      } else {
        setNextToken(data.getUser.objects.nextToken);
      }
    }
  };

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateS3Object)
    ).subscribe({
      next: ({
        value: {
          data: { onCreateS3Object: newItem }
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

  useEffect(() => {
    if (user) {
      getUserObjects();
    }
  }, [user]);

  const generateId = () => {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };

  const uploadFile = async file => {
    //console.log(file.name);
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
        graphqlOperation(mutations.createS3Object, {
          input: {
            key: fileId,
            name: file.name,
            prefix: prefix,
            s3ObjectCreatedById: user.id //check graphQL query console to get this ID
          }
        })
      );
      //console.log(res);
    }
  };

  const handleUpload = async e => {
    //const file = e.target.files[0];
    // e.target.files.forEach(file => {
    //   uploadFile(file);
    // });

    const fileArrary = [];
    const fileIndexes = Object.keys(e.target.files);
    fileIndexes.forEach(f => fileArrary.push(e.target.files[f]));

    // console.log(fileArrary);
    fileArrary.forEach(f => uploadFile(f));
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user'
  };
  return (
    <div className={classes.root}>
      {/* <Suspense fallback={<h1>Loading...</h1>}> */}
      <ListComponent
        files={s3files}
        fetchMoreData={getUserObjects}
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

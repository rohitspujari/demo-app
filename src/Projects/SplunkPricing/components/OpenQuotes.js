import React, { useRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Rekognition from '../../Rekognition';
import QuoteListComponent from './QuoteListComponent';
import useUserQuotes from './useUserQuotes';
import { makeStyles, useTheme } from '@material-ui/styles';
import { UserContext } from '../../../App';
import Divider from '@material-ui/core/Divider';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function OpenQuotes() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Open Quotes
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={'lg'}
        maxWidth={'lg'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Saved Quotes'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Quotes />
          {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OpenQuotes;

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  },
  root: {
    flexGrow: 1
    //margin: 20
  }
}));

function Quotes() {
  const classes = useStyles();
  const user = useContext(UserContext);

  const {
    quotes,
    hasMore,
    getUserQuotes,
    removeUserObject,
    uploadFiles
  } = useUserQuotes(user.id);
  //console.log(' --- render ----', quotes.length);

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
      <QuoteListComponent
        files={quotes}
        fetchMoreData={getUserQuotes}
        deleteItem={removeUserObject}
        hasMore={hasMore}
      />
      {/* </Suspense> */}
    </div>
  );
}

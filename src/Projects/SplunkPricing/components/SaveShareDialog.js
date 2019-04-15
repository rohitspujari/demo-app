import React, { useState, useContext, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { API, graphqlOperation } from 'aws-amplify';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CopyIcon from '@material-ui/icons/FileCopy';
import { UserContext } from '../../../App.js';
import * as mutations from '../../../graphql/mutations';
import { v4 as uuid } from 'uuid';

function SaveShareDialog(props) {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [quoteId, setQuoteId] = useState(null);
  const linkRef = useRef(null);
  // const [description, setDescription] = useState(
  //   '[Customer] Splunk Deployment on AWS'
  // );

  const { params, changeDescription, history, location } = props;
  console.log('logging history and location', history, location, window);

  //console.log('logging user context', user);
  async function handleClickOpen() {
    const newId = uuid();

    //Save the quote to DB
    await API.graphql(
      graphqlOperation(mutations.createQuote, {
        input: {
          id: newId,
          params: JSON.stringify(params),
          description: params.quoteDescription,
          quoteUserId: user.id
        }
      })
    );
    setQuoteId(newId);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const link = `http://aws.sonasher.com/splunkpricing?quote=${quoteId}`;

  return (
    <div>
      <Grid container alignItems="center" spacing={24}>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            size="large"
            onClick={handleClickOpen}
          >
            Save Quote
          </Button>
        </Grid>
        <Grid item xs={10}>
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Description"
            value={params.quoteDescription}
            onChange={changeDescription}
            //onFocus={e => (this.onFocusText = e.target.value)}
            // onBlur={this.handleRefresh}
            //defaultValue="30 days"
            //className={classes.textField}
            //margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Save and Share</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your preferences have been saved. You can share this link with
            another person.
          </DialogContentText>

          {/* <DialogContentText>
            To share this quote with another person, please enter their email
            address here. We will send them this link.
          </DialogContentText> */}

          <DialogContentText style={{ marginTop: 10, marginBottom: 10 }}>
            <a ref={linkRef} target="_blank" href={link}>
              {link}
            </a>
            <CopyToClipboard text={link}>
              <IconButton style={{ marginLeft: 10 }} aria-label="Copy">
                <CopyIcon />
              </IconButton>
            </CopyToClipboard>
          </DialogContentText>

          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          /> */}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            OK
          </Button>
          {/* <Button onClick={handleClose} color="primary">
            Send
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(SaveShareDialog);

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/FileCopy';

function SaveShareDialog() {
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const link = 'http://localhost:3000/splunkpricing?quote=32923u4904u23';

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
            Save and Share
          </Button>
        </Grid>
        <Grid item xs={10}>
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="Description"
            value={'[Customer] Splunk on AWS Deployment'}
            // onChange={handleChange('searchFactor')}
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
            To share this quote with another person, please enter their email
            address here. We will send them this link.
          </DialogContentText>

          <DialogContentText style={{ marginTop: 10, marginBottom: 10 }}>
            <a target="_blank" href={link}>
              {link}
            </a>
            <IconButton
              style={{ marginLeft: 10 }}
              aria-label="Delete"
              onClick={() => {}}
            >
              <DeleteIcon />
            </IconButton>
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SaveShareDialog;

// handleClickOpen = () => {
//     this.setState({ open: true });
//     const { params } = this.props;

//     console.log(params);
//   };

// <Grid container justify="center" alignItems="center" spacing={24}>
//         {/* <Grid item xs={12}> */}
//         <Divider />
//         {/* </Grid> */}
//         <Grid item xs={9}>
//           <TextField
//             required
//             fullWidth
//             id="outlined-required"
//             label="Description"
//             value={'[Customer] Splunk on AWS Deployment'}
//             // onChange={handleChange('searchFactor')}
//             //onFocus={e => (this.onFocusText = e.target.value)}
//             // onBlur={this.handleRefresh}
//             //defaultValue="30 days"
//             //className={classes.textField}
//             //margin="normal"
//             //variant="outlined"
//           />
//         </Grid>
//         <Grid item xs={3}>
//           {/* <Badge color="primary" badgeContent={4} className={classes.margin}>
//               <Button variant="contained" fullWidth>
//                 Button
//               </Button>
//             </Badge> */}
//           <Button
//             className={{ flex: 1 }}
//             variant="outlined"
//             color="primary"
//             fullwidth
//             size="large"
//             onClick={this.handleClickOpen}
//           >
//             Save and Share
//           </Button>
//         </Grid>
//         <Dialog
//           open={this.state.open}
//           onClose={this.handleClose}
//           aria-labelledby="form-dialog-title"
//         >
//           <DialogTitle id="form-dialog-title">Save and Share</DialogTitle>
//           <DialogContent>
//             <DialogContentText>
//               <a href="https://www.w3schools.com/html/">
//                 http://localhost:3000/splunkpricing#32923u4904u23
//               </a>
//             </DialogContentText>
//             <TextField
//               autoFocus
//               margin="dense"
//               id="name"
//               label="Email Address"
//               type="email"
//               fullWidth
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={this.handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={this.handleClose} color="primary">
//               Send
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Grid>

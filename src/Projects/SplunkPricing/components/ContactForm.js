import React from 'react';
//import ReactDOM from 'react-dom';
import { API } from 'aws-amplify';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import { Auth } from 'aws-amplify';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

const styles = theme => ({
  textField: {
    display: 'flex'
    // marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit
  },
  select: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class ContactForm extends React.Component {
  state = {
    open: false,
    // contact: `From: ${
    //   Auth.user.attributes.email
    // }, Phone: ${Auth.user.attributes.phone_number.replace(
    //   /(\+\d)(\d\d\d)(\d\d\d)(\d\d\d\d)/,
    //   '$1-$2.$3.$4'
    // )}`,
    reason: 'Ask Splunk/AWS Engineer',
    customer: '',
    message: '',
    labelWidth: 0
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  //   handleChange = e => {
  //     this.setState({
  //       reason: e.target.value
  //     });
  //   };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSend = () => {
    const { reason, customer, message } = this.state;
    const { user } = this.props;

    // const contact = `From: ${
    //   user.attributes.email
    // }, Phone: ${user.attributes.phone_number.replace(
    //   /(\+\d)(\d\d\d)(\d\d\d)(\d\d\d\d)/,
    //   '$1-$2.$3.$4'
    // )}`;

    const contact = `From: ${user.email}`;

    var params = {
      contact,
      reason,
      customer,
      message
    };

    if (customer === '' || message === '') {
      return;
    }

    let apiName = 'SendEmail'; // replace this with your api name.
    let path = '/email'; //replace this with the path you have configured on your API
    let myInit = {
      body: { params } // replace this with attributes you need
    };

    API.post(apiName, path, myInit)
      .then(response => {
        // Add your code here
        //console.log(response);
        this.handleClose();
      })
      .catch(error => {
        console.log(error.response);
      });

    // const result =
  };

  componentDidMount() {
    this.setState({
      //labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
      labelWidth: 70
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          //variant="contained"
          //color="primary"
          onClick={this.handleClickOpen}
        >
          Contact us
        </Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            How can we help?
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.select}>
                  <InputLabel
                    ref={ref => {
                      this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-age-simple"
                  >
                    Reason
                  </InputLabel>
                  <Select
                    value={this.state.reason}
                    onChange={this.handleChange('reason')}
                    input={
                      <OutlinedInput
                        labelWidth={this.state.labelWidth}
                        name="age"
                        id="outlined-age-simple"
                      />
                    }
                  >
                    <MenuItem value={'Ask Splunk/AWS Engineer'}>
                      Ask Splunk/AWS Engineer
                    </MenuItem>
                    <MenuItem value={'Request Demo'}>Request Demo</MenuItem>
                    <MenuItem value={'Request PoC'}>Request PoC</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={this.handleChange('customer')}
                  id="outlined-multiline-static"
                  label="Customer Name"
                  className={classes.textField}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  required
                  onChange={this.handleChange('message')}
                  label="Message"
                  multiline
                  rows="4"
                  //   defaultValue="Default Value"
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Typography gutterBottom>
              Someone from Splunk or Amazon will be in touch with you shortly!
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleSend}
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Send
              {/* <SendIcon fontSize="small" className={classes.rightIcon} /> */}
              {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ContactForm);

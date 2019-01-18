import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import LogOutIcon from '@material-ui/icons/PowerSettingsNew';
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function NavigationBar(props) {
  const { classes, username, logout, history } = props;

  return (
    <div className={classes.root}>
      {/* <Grid container item xs={12}> */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={() => history.push('/')}
          >
            <HomeIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" className={classes.grow} />
          <Typography variant="h6" color="inherit" style={{ marginRight: 20 }}>
            {username}
          </Typography>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={logout}
          >
            <LogOutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* </Grid> */}
    </div>
  );
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavigationBar);

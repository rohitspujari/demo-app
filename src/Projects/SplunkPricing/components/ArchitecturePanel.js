import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DescriptionIcon from '@material-ui/icons/Description';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  expansionPanelHeading: {
    marginLeft: 10,
    fontSize: theme.typography.pxToRem(15)
  }
});

function ArchitecturePanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <DescriptionIcon fontSize="small" />
          <Typography className={classes.expansionPanelHeading}>
            Splunk Architecture
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container alignItems="center" justify="center">
            <img
              src={require('../splunk-s2-architecture.png')}
              // height="600"
              // width="600"
              alt="aws logo"
            />
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

ArchitecturePanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ArchitecturePanel);

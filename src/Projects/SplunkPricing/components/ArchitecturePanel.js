import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DescriptionIcon from '@material-ui/icons/Description';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

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

function buildQSUrl(props) {
  let url = '';
  url =
    'https://eu-central-1.console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/create/review?templateURL=https://aws-quickstart.s3.amazonaws.com/quickstart-splunk-enterprise/templates/splunk-enterprise-master.template&stackName=Splunk-Enterprise&param_SplunkAdminPassword=Sp1unk0naws&param_IndexerInstanceType=c4.xlarge&param_SearchHeadInstanceType=c4.xlarge&param_NumberOfAZs=2&param_HECClientLocation=0.0.0.0/0&param_SSHClientLocation=0.0.0.0/0&param_VPCCIDR=10.0.0.0/16&param_PublicSubnet1CIDR=10.0.1.0/24&param_PublicSubnet2CIDR=10.0.2.0/24&param_PublicSubnet3CIDR=10.0.3.0/24&param_SplunkIndexerCount=5&param_SplunkIndexerDiskSize=100&param_SplunkReplicationFactor=3&param_SHCEnabled=no&param_QSS3BucketName=aws-quickstart&param_QSS3KeyPrefix=quickstart-splunk-enterprise/';
  return url;
}

function ArchitecturePanel(props) {
  const { classes } = props;
  const quickStartURL = buildQSUrl(props);

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
            <Grid item xs={12}>
              <div>
                <Button
                  href={quickStartURL}
                  target="_blank"
                  variant="contained"
                  className={classes.button}
                >
                  Deploy Quickstart
                </Button>
              </div>
            </Grid>
            {/* <Grid item xs={12}> */}
            <img
              src={require('../splunk-s2-architecture.png')}
              // height="600"
              // width="600"
              alt="aws logo"
            />
            {/* </Grid> */}
            {/* <Grid item xs={12}>
              <Button variant="contained" className={classes.button}>
                Deploy Quickstart
              </Button>
            </Grid> */}
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

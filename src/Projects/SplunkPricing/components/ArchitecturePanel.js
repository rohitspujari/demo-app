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
import S2Img from '../splunk-s2-architecture.png';
import IDRImg from '../splunk-idr-architecture.png';
import Button from '@material-ui/core/Button';

const LOCATIONS = [
  { regionName: 'US East (Ohio)', region: 'us-east-2' },
  { regionName: 'US East (N. Virginia)', region: 'us-east-1' },
  { regionName: 'US West (N. California)', region: 'us-west-1' },
  { regionName: 'US West (Oregon)', region: 'us-west-2' },
  { regionName: 'Asia Pacific (Mumbai)', region: 'ap-south-1' },
  { regionName: 'Asia Pacific (Osaka-Local)', region: 'ap-northeast-3' },
  { regionName: 'Asia Pacific (Seoul)', region: 'ap-northeast-2' },
  { regionName: 'Asia Pacific (Singapore)', region: 'ap-southeast-1' },
  { regionName: 'Asia Pacific (Sydney)', region: 'ap-southeast-2' },
  { regionName: 'Asia Pacific (Tokyo)', region: 'ap-northeast-1' },
  { regionName: 'Canada (Central)', region: 'ca-central-1' },
  { regionName: 'China (Beijing)', region: 'cn-north-1' },
  { regionName: 'China (Ningxia)', region: 'cn-northwest-1' },
  { regionName: 'EU (Frankfurt)', region: 'eu-central-1' },
  { regionName: 'EU (Ireland)', region: 'eu-west-1' },
  { regionName: 'EU (London)', region: 'eu-west-2' },
  { regionName: 'EU (Paris)', region: 'eu-west-3' },
  { regionName: 'EU (Stockholm)', region: 'eu-north-1' },
  { regionName: 'South America (São Paulo)', region: 'sa-east-1' },
  { regionName: 'AWS GovCloud (US-East)', region: 'us-gov-east-1' },
  { regionName: 'AWS GovCloud (US)', region: 'us-gov-west-1' }
];

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
  const {
    location,
    splunkArchitecture,
    s2IndexerInstanceType,
    idrIndexerInstanceType,
    coreSearchHeadInstanceType,
    replicationFactor,
    clusteredSearchHeads,
    result
  } = props;
  const indexerInstanceType =
    splunkArchitecture === 'Smart Store (S2)'
      ? s2IndexerInstanceType
      : idrIndexerInstanceType;

  //debugger;

  if (result.length === 0) {
    return;
  }
  const shcEnabled = clusteredSearchHeads === true ? 'yes' : 'no';
  const noOfIndexers = result.computeResources.filter(
    f => f.name === 'Indexer'
  )[0].count;

  const region = LOCATIONS.filter(f => f.regionName === location)[0].region;

  debugger;
  let url = '';
  url =
    `https://${region}.console.aws.amazon.com/cloudformation/home?` +
    `region=${region}#/stacks/create/review?` +
    `templateURL=https://aws-quickstart.s3.amazonaws.com/quickstart-splunk-enterprise/templates/splunk-enterprise-master.template` +
    `&stackName=Splunk-Enterprise&` +
    `param_IndexerInstanceType=${indexerInstanceType}&` +
    `param_SearchHeadInstanceType=${coreSearchHeadInstanceType}&` +
    `param_NumberOfAZs=2&` +
    `param_HECClientLocation=0.0.0.0/0&` +
    `param_SSHClientLocation=0.0.0.0/0&` +
    `param_VPCCIDR=10.0.0.0/16&` +
    `param_PublicSubnet1CIDR=10.0.1.0/24&` +
    `param_PublicSubnet2CIDR=10.0.2.0/24&` +
    `param_PublicSubnet3CIDR=10.0.3.0/24&` +
    `param_SplunkIndexerCount=${noOfIndexers}&` +
    `param_SplunkIndexerDiskSize=100&` +
    `param_SplunkReplicationFactor=${replicationFactor}&` +
    `param_SHCEnabled=${clusteredSearchHeads === true ? 'yes' : 'no'}&` +
    `param_QSS3BucketName=aws-quickstart&` +
    `param_QSS3KeyPrefix=quickstart-splunk-enterprise/`;
  return url;
}

function ArchitecturePanel(props) {
  const { classes, architecture } = props;
  const quickStartURL = buildQSUrl(props);

  let image = S2Img;
  if (architecture !== 'Smart Store (S2)') {
    image = IDRImg;
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <DescriptionIcon fontSize="small" />
          <Typography className={classes.expansionPanelHeading}>
            Architecture on AWS
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
                  Deploy
                </Button>
              </div>
            </Grid>
            {/* <Grid item xs={12}> */}
            <img
              src={image}
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

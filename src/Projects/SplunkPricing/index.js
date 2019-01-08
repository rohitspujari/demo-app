import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as utils from './utils.js';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';

import CostSummary from './components/CostSummary.js';

const BILLING_OPTIONS = [
  {
    term: 'OnDemand', //Onemand, Reserved
    LeaseContractLength: '', // "1yr"
    OfferingClass: '', // "standard", "convertible"
    PurchaseOption: '',
    description: 'On-Demand (No Contract)'
  },
  {
    term: 'Reserved', //Onemand, Reserved
    LeaseContractLength: '1yr', // "1yr"
    OfferingClass: 'standard', // "standard", "convertible"
    PurchaseOption: 'No Upfront', // "No Upfront" , "All Upfront"
    description: '1 Yr No Upfront Reserved'
  },
  {
    term: 'Reserved', //Onemand, Reserved
    LeaseContractLength: '1yr', // "1yr"
    OfferingClass: 'standard', // "standard", "convertible"
    PurchaseOption: 'Partial Upfront', // "No Upfront" , "All Upfront"
    description: '1 Yr Partial Upfront Reserved'
  },
  {
    term: 'Reserved', //Onemand, Reserved
    LeaseContractLength: '1yr', // "1yr"
    OfferingClass: 'standard', // "standard", "convertible"
    PurchaseOption: 'All Upfront', // "No Upfront" , "All Upfront"
    description: '1 Yr All Upfront Reserved'
  },
  {
    term: 'Reserved', //Onemand, Reserved
    LeaseContractLength: '3yr', // "1yr"
    OfferingClass: 'standard', // "standard", "convertible"
    PurchaseOption: 'No Upfront', // "No Upfront" , "All Upfront"
    description: '3 Yr No Upfront Reserved'
  },
  {
    term: 'Reserved', //Onemand, Reserved
    LeaseContractLength: '3yr', // "1yr"
    OfferingClass: 'standard', // "standard", "convertible"
    PurchaseOption: 'Partial Upfront', // "No Upfront" , "All Upfront"
    description: '3 Yr Partial Upfront Reserved'
  },
  {
    term: 'Reserved', //Onemand, Reserved
    LeaseContractLength: '3yr', // "1yr"
    OfferingClass: 'standard', // "standard", "convertible"
    PurchaseOption: 'All Upfront', // "No Upfront" , "All Upfront"
    description: '3 Yr All Upfront Reserved'
  },
  {
    term: 'Reserved', //Onemand, Reserved
    LeaseContractLength: '1yr', // "1yr"
    OfferingClass: 'convertible', // "standard", "convertible"
    PurchaseOption: 'No Upfront', // "No Upfront" , "All Upfront"
    description: '1 Yr No Upfront convertible'
  },
  {
    term: 'Reserved', //Onemand, Reserved
    LeaseContractLength: '1yr', // "1yr"
    OfferingClass: 'convertible', // "standard", "convertible"
    PurchaseOption: 'Partial Upfront', // "No Upfront" , "All Upfront"
    description: '1 Yr Partial Upfront convertible'
  },
  {
    term: 'Reserved', //Onemand, Reserved
    LeaseContractLength: '1yr', // "1yr"
    OfferingClass: 'convertible', // "standard", "convertible"
    PurchaseOption: 'All Upfront', // "No Upfront" , "All Upfront"
    description: '1 Yr All Upfront convertible'
  },
  {
    term: 'Reserved', //Onemand, Reserved
    LeaseContractLength: '3yr', // "1yr"
    OfferingClass: 'convertible', // "standard", "convertible"
    PurchaseOption: 'No Upfront', // "No Upfront" , "All Upfront"
    description: '3 Yr No Upfront convertible'
  },
  {
    term: 'Reserved', //Onemand, Reserved
    LeaseContractLength: '3yr', // "1yr"
    OfferingClass: 'convertible', // "standard", "convertible"
    PurchaseOption: 'Partial Upfront', // "No Upfront" , "All Upfront"
    description: '3 Yr Partial Upfront convertible'
  },
  {
    term: 'Reserved', //Onemand, Reserved
    LeaseContractLength: '3yr', // "1yr"
    OfferingClass: 'convertible', // "standard", "convertible"
    PurchaseOption: 'All Upfront', // "No Upfront" , "All Upfront"
    description: '3 Yr All Upfront convertible'
  }
];
const DEPLOYMENT_OPTIONS = ['Spunk on AWS', 'Splunk Cloud'];
const styles = theme => ({
  button: {
    display: 'flex'
  },
  progress: {
    margin: theme.spacing.unit * 2
  },

  constainer: {
    //margin: 20
  },
  root: {
    //marginTop: 20,
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  textField: {
    display: 'flex'
  },
  border: {
    //backgroundColor: 'red',
    borderWidth: 'thin',
    borderStyle: 'solid',
    borderColor: 'red'
  },
  select: {
    display: 'flex'
  },
  expansionPanelHeading: {
    fontSize: theme.typography.pxToRem(15)
  }
});

class SplunkPricing extends Component {
  // state = {
  //   locaton: 'us-east1',
  //   locations: [],
  //   billingOption: '3 year partial upfront reserved',
  //   billingOptions: [],
  //   deploymentOption: 'Splunk on AWS', //SplunkCloud
  //   volumePerDay: 100, // in GB
  //   retention: 90, // in days
  //   hotWarmRetention: 30, // in days
  //   coldRentention: 365,
  //   splunkArchitecture: 'S2', //S2, IDR
  //   searchFactor: 2,
  //   replicationFactor: 2,
  //   clusterIndexers: true,
  //   clusterSearchHeads: true,
  //   splunkES: false,
  //   splunkITSI: false
  // };

  state = {
    billingOptions: BILLING_OPTIONS,
    billingOption: BILLING_OPTIONS[5],
    location: 'US East (N. Virginia)',
    volumePerDay: 100,
    compressionPercent: 50,
    coreIndexerRate: 250,
    operatingSystem: 'Linux',
    s2IndexerInstanceType: 'i3.8xlarge',
    idrIndexerInstanceType: 'c5.9xlarge',
    coreSearchHeadInstanceType: 'c5.9xlarge',
    esSearchHeadInstanceType: 'c5.9xlarge',
    clusterMasterInstanceType: 'c5.4xlarge',
    licenseMasterInstanceType: 'c5.2xlarge',
    awsCollectorNodeInstanceType: 'c5.4xlarge',
    esIndexerRate: 100,
    retentionHot: 30,
    retentionCold: 0,
    replicationFactor: 2,
    searchFactor: 2,
    splunkArchitecture: 'Smart Store (S2)',
    splunkES: false,
    splunkITSI: false,
    clusterIndexers: true,
    clusterSearchHeads: true,
    deploymentOptions: DEPLOYMENT_OPTIONS,
    deploymentOption: DEPLOYMENT_OPTIONS[0],
    locations: [],
    result: '',
    //Component Sate
    labelWidth: 0,
    inProgress: 'true'
  };
  async componentDidMount() {
    this.setState({
      result: await utils.priceSplunkDeployment(this.state),
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      inProgress: false
    });

    utils.getAttributes('location', 'AmazonS3', '100', (data, err) => {
      console.log(data);

      this.setState({
        locations: data.AttributeValues.map(r => r.Value)
          .sort()
          .reverse()
      });
    });

    // utils.getAttributes('group', 'AmazonEC2', '100', (data, err) => {
    //   console.log(data);

    //   // this.setState({
    //   //   regions: data.AttributeValues.map(r => r.Value)
    //   //     .sort()
    //   //     .reverse()
    //   // });
    // });

    // utils.getEc2Price(ec2Instance, billingOption, (price, err) => {
    //   console.log({
    //     instance: ec2Instance,
    //     billing: billingOption,
    //     price
    //   });
    // });

    // utils.getS3Price(
    //   10000000,
    //   'Standard',
    //   'US East (N. Virginia)',
    //   (price, err) => {
    //     console.log('S3-Price', price);
    //   }
    // );

    //   utils.getEbsPrice(
    //     10000,
    //     'Throughput Optimized HDD',
    //     'US East (N. Virginia)',
    //     (price, err) => {
    //       console.log('EBS-Price', price);
    //     }
    //   );
    //
  }

  handleChange = name => event => {
    utils
      .priceSplunkDeployment({ ...this.state, [name]: event.target.value })
      .then(result => {
        //console.log(result);
        this.setState({
          result,
          inProgress: false
        });
      });

    this.setState({
      ...this.state,
      [name]: event.target.value,
      inProgress: true
    });
  };

  toggleChange = name => event => {
    utils
      .priceSplunkDeployment({ ...this.state, [name]: event.target.checked })
      .then(result => {
        //console.log(result);
        this.setState({
          result,
          inProgress: false
        });
      });
    this.setState({
      ...this.state,
      [name]: event.target.checked,
      inProgress: true
      //result
    });
  };

  render() {
    const { classes } = this.props;
    const { handleChange, toggleChange } = this;
    const {
      splunkArchitecture,
      deploymentOptions,
      deploymentOption,
      billingOptions,
      billingOption,
      locations,
      location
    } = this.state;

    console.log('render', this.state.result);

    return (
      <div className={classes.container}>
        {/* <h3 className="Title">Welcome to Splunk Pricing Page</h3> */}
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              {/* <Paper className={classes.paper}>AWS Assumptions</Paper> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <Paper className={classes.paper}>AWS Assumptions</Paper> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="outlined-required"
                label="Index Volume/Splunk License"
                value={this.state.volumePerDay}
                onChange={handleChange('volumePerDay')}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">GBs/Day</InputAdornment>
                  )
                }}
              />
              {/* <Paper className={classes.paper}>Volume Per Day</Paper> */}
              {/* </Grid>
            <Grid item xs={12} sm={6} />

            <Grid item xs={12} sm={3}> */}
              <TextField
                required
                id="outlined-required"
                label="Hot Retention"
                value={this.state.retentionHot}
                onChange={handleChange('retentionHot')}
                //defaultValue="30 days"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Days</InputAdornment>
                  )
                }}
              />
              {/* <Paper className={classes.paper}>Retention (Hot)</Paper> */}
              {/* </Grid> */}
              {/* <Grid item xs={12} sm={3}> */}
              <TextField
                id="outlined-uncontrolled"
                label="Cold Retention"
                value={this.state.retentionCold}
                onChange={handleChange('retentionCold')}
                //defaultValue="90 days"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Days</InputAdornment>
                  )
                }}
              />
              {/* <Button
                size="large"
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => {
                  this.setState({
                    //...this.state,
                    result: utils.priceSplunkDeployment(this.state)
                  });
                }}
              >
                Calculate
              </Button> */}
              {/* <Paper className={classes.paper}>Retention (Cold)</Paper> */}
            </Grid>
            {/* <Grid item xs={12} sm={6} /> */}
            <Grid item xs={6} sm={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.splunkES}
                    onChange={toggleChange('splunkES')}
                    value={this.state.splunkES.toString()}
                    color="primary"
                  />
                }
                label="Enterprise Security"
              />
              {/* </Grid> */}
              {/* <Grid item xs={6} sm={3}> */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.splunkITSI}
                    onChange={toggleChange('splunkITSI')}
                    value={this.state.splunkITSI.toString()}
                    color="primary"
                  />
                }
                label="IT Service Intelligence"
              />
              {/* <Paper className={classes.paper}>ES or ITSI</Paper> */}
            </Grid>
            <Grid item xs={12}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <div>
                    <Typography className={classes.expansionPanelHeading}>
                      Advanced Settings
                    </Typography>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className={classes.root}>
                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        <div>
                          <Typography fontSize={11} color="primary">
                            AWS Options
                          </Typography>
                          <Divider />
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <FormControl
                          variant="outlined"
                          className={classes.select}
                        >
                          <InputLabel
                            ref={ref => {
                              this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                          >
                            Deployment
                          </InputLabel>
                          <Select
                            value={deploymentOption}
                            onChange={handleChange('deploymentOption')}
                            input={
                              <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="age"
                                id="outlined-age-simple"
                              />
                            }
                          >
                            {deploymentOptions.map((option, i) => (
                              <MenuItem key={i} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {/* <Paper className={classes.paper}>
                          Deployment Option
                        </Paper> */}
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl
                          variant="outlined"
                          className={classes.select}
                        >
                          <InputLabel
                            ref={ref => {
                              this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                          >
                            AWS Region
                          </InputLabel>
                          <Select
                            value={location}
                            onChange={handleChange('location')}
                            input={
                              <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="age"
                                id="outlined-age-simple"
                              />
                            }
                          >
                            {locations.map((region, i) => (
                              <MenuItem key={i} value={region}>
                                {region}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {/* <Paper className={classes.paper}>AWS Region</Paper> */}
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl
                          variant="outlined"
                          className={classes.select}
                        >
                          <InputLabel
                            ref={ref => {
                              this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                          >
                            Billing Option
                          </InputLabel>
                          <Select
                            value={billingOption}
                            onChange={handleChange('billingOption')}
                            input={
                              <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="age"
                                id="outlined-age-simple"
                                //value={'US East 1'}
                              />
                            }
                          >
                            {billingOptions.map((option, i) => (
                              <MenuItem key={i} value={option}>
                                {option.description}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {/* <Paper className={classes.paper}>
                          Server Billing Option
                        </Paper> */}
                      </Grid>

                      <Grid item xs={12}>
                        <div>
                          <Typography fontSize={11} color="primary">
                            Splunk Options
                          </Typography>
                          <Divider />
                        </div>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.clusterIndexers}
                              onChange={toggleChange('clusterIndexers')}
                              value={this.state.clusterIndexers.toString()}
                              color="primary"
                            />
                          }
                          label="Cluster Indexers"
                        />

                        {/* <Paper className={classes.paper}>Indexer Cluster</Paper> */}
                      </Grid>

                      <Grid item xs={6} sm={3}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.clusterSearchHeads}
                              onChange={toggleChange('clusterSearchHeads')}
                              value={this.state.clusterSearchHeads.toString()}
                              color="primary"
                            />
                          }
                          label="Cluster Search Heads"
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <FormControl
                          variant="outlined"
                          className={classes.select}
                        >
                          <InputLabel
                            ref={ref => {
                              this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                          >
                            Architecture
                          </InputLabel>
                          <Select
                            value={splunkArchitecture}
                            onChange={handleChange('splunkArchitecture')}
                            input={
                              <OutlinedInput
                                labelWidth={this.state.labelWidth}
                                name="age"
                                id="outlined-age-simple"
                                //value={'US East 1'}
                              />
                            }
                          >
                            <MenuItem value={'Smart Store (S2)'}>
                              Smart Store (S2)
                            </MenuItem>
                            <MenuItem value={'Indxer Cluster Replication'}>
                              Indxer Cluster Replication (IDR)
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item sm={1} xs={6}>
                        <TextField
                          required
                          id="outlined-required"
                          label="Replication Factor"
                          value={this.state.replicationFactor}
                          onChange={handleChange('replicationFactor')}
                          //defaultValue="30 days"
                          className={classes.textField}
                          //margin="normal"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item sm={1} xs={6}>
                        <TextField
                          required
                          id="outlined-required"
                          label="Search Factor"
                          value={this.state.searchFactor}
                          onChange={handleChange('searchFactor')}
                          //defaultValue="30 days"
                          className={classes.textField}
                          //margin="normal"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>

            <Grid item xs={12}>
              {!this.state.inProgress ? (
                <CostSummary datasource={this.state.result.computeResources} />
              ) : (
                <CircularProgress className={classes.progress} />
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(SplunkPricing);

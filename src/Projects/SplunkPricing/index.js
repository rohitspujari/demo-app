import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import * as utils from './utils.js';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
//import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
import SettingsIcon from '@material-ui/icons/Settings';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Auth } from 'aws-amplify';
import CostSummary from './components/CostSummary.js';
import ArchitecturePanel from './components/ArchitecturePanel.js';
import ContactForm from './components/ContactForm.js';

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
const DEPLOYMENT_OPTIONS = ['Splunk on AWS', 'Splunk Cloud'];
const styles = theme => ({
  button: {
    display: 'flex'
  },
  progress: {
    margin: theme.spacing.unit * 2
  },

  root: {
    //marginTop: 20,
    flexGrow: 1,
    padding: 20
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
  heading: {
    marginTop: 20
  },
  expansionPanelHeading: {
    marginLeft: 10,
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

  //this.onFocusText = '';

  state = {
    awsSupportTier: 'Business',
    billingOptions: BILLING_OPTIONS,
    billingOption: BILLING_OPTIONS[6],
    locations: [],
    location: 'US East (N. Virginia)',
    s3VolumeTypes: [],
    s3VolumeType: 'Standard',
    ebsVolumeTypes: [],
    hotEbsVolumeType: 'General Purpose',
    coldEbsVolumeType: 'Cold HDD',
    rootVolumeType: 'General Purpose',
    volumePerDay: 1000,
    compressionPercent: 50,
    coreIndexerRate: 250,
    esIndexerRate: 100,
    operatingSystems: [],
    operatingSystem: 'Linux',
    s2IndexerInstanceType: 'i3.8xlarge',
    idrIndexerInstanceType: 'c5.9xlarge',
    coreSearchHeadInstanceType: 'c5.9xlarge',
    esSearchHeadInstanceType: 'c5.9xlarge',
    clusterMasterInstanceType: 'c5.4xlarge',
    licenseMasterInstanceType: 'c5.2xlarge',
    awsCollectorNodeInstanceType: 'c5.4xlarge',

    retentionHot: 30,
    retentionCold: 90,
    replicationFactor: 2,
    searchFactor: 2,
    splunkArchitecture: 'Smart Store (S2)',
    splunkES: false,
    splunkITSI: false,
    clusterIndexers: true,
    clusterSearchHeads: true,
    deploymentOptions: DEPLOYMENT_OPTIONS,
    deploymentOption: DEPLOYMENT_OPTIONS[0],
    noOfConcurrentUsers: '16',

    result: [],
    //Component Sate
    user: '',
    labelWidth: 100,
    inProgress: true
  };

  async componentDidMount() {
    this.setState({
      user: await Auth.currentAuthenticatedUser({
        bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }),
      result: await utils.priceSplunkDeployment(this.state),
      locations: await utils.getAttributes('location', 'AmazonS3', '100'),
      operatingSystems: await utils.getAttributes(
        'operatingSystem',
        'AmazonEc2',
        '100'
      ),
      s3VolumeTypes: await utils.getAttributes('volumeType', 'AmazonS3', '100'),
      ebsVolumeTypes: await utils.getAttributes(
        'volumeType',
        'AmazonEC2',
        '100'
      ),

      //labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      inProgress: false
    });

    // const x = await utils.getAttributes('location', 'AmazonEC2', '1000');
    // console.log(x);

    // utils.getAttributes('location', 'AmazonS3', '100', (data, err) => {
    //   //console.log(data);

    //   this.setState({
    //     locations: data.AttributeValues.map(r => r.Value)
    //       .sort()
    //       .reverse()
    //   });
    // });

    // console.log(await utils.getAttributes('locationType', 'AmazonEc2', '100'));

    // utils.describeService('Route53', '100', (data, err) => {
    //   console.log(data);
    // });

    // utils.getAttributes('volumeType', 'AmazonS3', '100', (data, err) => {
    //   console.log(data.AttributeValues.map(av => av.Value));
    // });

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

  isValidInput = (name, value) => {
    if (name === 'volumePerDay') {
      if (isNaN(value)) return false;
      if (value > 1000000) return false;
      if (value < 0) return false;
    }
    if (name === 'retentionHot' || name === 'retentionCold') {
      if (value > 2000) return false;
    }

    if (name === 'replicationFactor' || name === 'searchFactor') {
      if (value > 5) return false;
    }

    if (name === 'coreIndexerRate' || name === 'esIndexerRate') {
      if (value > 1000) return false;
    }

    return true;
  };

  handleRefresh = e => {
    if (this.onFocusText === e.target.value) {
      return; // if the value in the text box in unchanged return
    }

    this.setState({ inProgress: true });
    utils.priceSplunkDeployment({ ...this.state }).then(result => {
      //console.log(result);
      this.setState({
        result,
        inProgress: false
      });
    });
  };

  handleChange = name => event => {
    if (!this.isValidInput(name, event.target.value)) {
      return;
    }

    ////console.log(event.target.type);

    if (event.target.type === 'text') {
      //Don't make network request for text componenets
      // debugger;
      if (name === 'volumePerDay') {
        var s2IdxInstanceType = '';
        var idrIdxInstanceType = '';
        var coreIdxRate = 0;
        var esIdxRate = 0;
        if (event.target.value < 500) {
          coreIdxRate = 100;
          esIdxRate = 50;
          s2IdxInstanceType = 'i3.4xlarge';
          idrIdxInstanceType = 'c5.4xlarge';
        } else {
          coreIdxRate = 250;
          esIdxRate = 100;
          s2IdxInstanceType = 'i3.8xlarge';
          idrIdxInstanceType = 'c5.9xlarge';
        }
        this.setState({
          ...this.state,
          [name]: event.target.value,
          coreIndexerRate: coreIdxRate,
          esIndexerRate: esIdxRate,
          s2IndexerInstanceType: s2IdxInstanceType,
          idrIndexerInstanceType: idrIdxInstanceType
        });
      } else {
        this.setState({
          ...this.state,
          [name]: event.target.value
        });
      }
    } else {
      // make network calls for other components
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
    }
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
    // console.log(this.state);
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

    //console.log('render', this.state.result);

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom className={classes.heading}>
              AWS Infrastructure Costs for Splunk
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="outlined-required"
              label="Index Volume / Splunk License"
              value={this.state.volumePerDay}
              onChange={handleChange('volumePerDay')}
              onFocus={e => (this.onFocusText = e.target.value)}
              onBlur={this.handleRefresh}
              className={classes.textField}
              //margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">GB/day</InputAdornment>
                )
              }}
            />

            <TextField
              required
              id="outlined-required"
              label="Hot Retention (IDR) / Cache (S2)"
              value={this.state.retentionHot}
              onChange={handleChange('retentionHot')}
              onFocus={e => (this.onFocusText = e.target.value)}
              onBlur={this.handleRefresh}
              //defaultValue="30 days"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">days</InputAdornment>
                )
              }}
            />

            <TextField
              id="outlined-uncontrolled"
              label="Cold Retention / Total Retention"
              value={this.state.retentionCold}
              onChange={handleChange('retentionCold')}
              onFocus={e => (this.onFocusText = e.target.value)}
              onBlur={this.handleRefresh}
              //defaultValue="90 days"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">days</InputAdornment>
                )
              }}
            />
          </Grid>
          {/* <Hidden smDown> */}
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            xs={12}
            sm={6}
          >
            <Hidden smDown>
              <Grid item>
                {/* <Grid container> */}
                {/* <Grid item xs={12}> */}
                <img
                  src={require('./awslogo.jpg')}
                  height="150"
                  width="250"
                  alt="aws logo"
                />
                {/* </Grid> */}
                {/* <Grid item xs={12}> */}
                <img
                  src={require('./splunklogo.png')}
                  height="150"
                  width="250"
                  alt="splunk logo"
                />
              </Grid>
            </Hidden>
            <Grid container justify="center" alignItems="center" item sm={12}>
              <ContactForm user={this.state.user} />
            </Grid>
          </Grid>
          {/* </Hidden> */}

          <Grid item xs={6} sm={3}>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={this.state.inProgress}
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
                  disabled={this.state.inProgress}
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
                <SettingsIcon fontSize="small" />
                <Typography className={classes.expansionPanelHeading}>
                  Change Default Settings
                </Typography>
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
                    <Grid item xs={12} sm={3}>
                      <FormControl
                        disabled
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
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
                          AWS Support
                        </InputLabel>
                        <Select
                          value={this.state.awsSupportTier}
                          onChange={handleChange('awsSupportTier')}
                          input={
                            <OutlinedInput
                              labelWidth={this.state.labelWidth}
                              name="age"
                              id="outlined-age-simple"
                              //value={'US East 1'}
                            />
                          }
                        >
                          <MenuItem value={'NA'}>Exclude Support</MenuItem>
                          <MenuItem value={'Developer'}>Developer</MenuItem>
                          <MenuItem value={'Business'}>Business</MenuItem>
                          <MenuItem value={'Enterprise'}>Enterprise</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3}>
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
                          S3 Volume
                        </InputLabel>
                        <Select
                          value={this.state.s3VolumeType}
                          onChange={handleChange('s3VolumeType')}
                          input={
                            <OutlinedInput
                              labelWidth={this.state.labelWidth}
                              name="age"
                              id="outlined-age-simple"
                            />
                          }
                        >
                          {this.state.s3VolumeTypes.map((value, i) => (
                            <MenuItem key={i} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* <Paper className={classes.paper}>S3 Volumes</Paper> */}
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
                          Hot Volume
                        </InputLabel>
                        <Select
                          value={this.state.hotEbsVolumeType}
                          onChange={handleChange('hotEbsVolumeType')}
                          input={
                            <OutlinedInput
                              labelWidth={this.state.labelWidth}
                              name="age"
                              id="outlined-age-simple"
                            />
                          }
                        >
                          {this.state.ebsVolumeTypes.map((value, i) => (
                            <MenuItem key={i} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* <Paper className={classes.paper}>Hot EBS Volumes</Paper> */}
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
                          Cold Volume
                        </InputLabel>
                        <Select
                          value={this.state.coldEbsVolumeType}
                          onChange={handleChange('coldEbsVolumeType')}
                          input={
                            <OutlinedInput
                              labelWidth={this.state.labelWidth}
                              name="age"
                              id="outlined-age-simple"
                            />
                          }
                        >
                          {this.state.ebsVolumeTypes.map((value, i) => (
                            <MenuItem key={i} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* <Paper className={classes.paper}>Cold EBS Volumes</Paper> */}
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
                    <Grid item xs={12} sm={3}>
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
                    <Grid item xs={12} sm={3}>
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
                          Compression
                        </InputLabel>
                        <Select
                          value={this.state.compressionPercent}
                          onChange={handleChange('compressionPercent')}
                          input={
                            <OutlinedInput
                              labelWidth={this.state.labelWidth}
                              id="outlined-age-simple"
                            />
                          }
                        >
                          <MenuItem key={1} value={50}>
                            {'50 %'}
                          </MenuItem>
                          <MenuItem key={2} value={40}>
                            {'40 %'}
                          </MenuItem>
                          <MenuItem key={3} value={30}>
                            {'30 %'}
                          </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* <Paper className={classes.paper}>
                          Compresssion
                        </Paper> */}
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled={this.state.inProgress}
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
                            disabled={this.state.inProgress}
                            checked={this.state.clusterSearchHeads}
                            onChange={toggleChange('clusterSearchHeads')}
                            value={this.state.clusterSearchHeads.toString()}
                            color="primary"
                          />
                        }
                        label="Cluster Search Heads"
                      />
                    </Grid>

                    <Grid item sm={3} xs={6}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Replication Factor"
                        value={this.state.replicationFactor}
                        onChange={handleChange('replicationFactor')}
                        onFocus={e => (this.onFocusText = e.target.value)}
                        onBlur={this.handleRefresh}
                        //defaultValue="30 days"
                        className={classes.textField}
                        //margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item sm={3} xs={6}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Search Factor"
                        value={this.state.searchFactor}
                        onChange={handleChange('searchFactor')}
                        onFocus={e => (this.onFocusText = e.target.value)}
                        onBlur={this.handleRefresh}
                        //defaultValue="30 days"
                        className={classes.textField}
                        //margin="normal"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Core Indexer Rate"
                        value={this.state.coreIndexerRate}
                        onChange={handleChange('coreIndexerRate')}
                        onFocus={e => (this.onFocusText = e.target.value)}
                        onBlur={this.handleRefresh}
                        className={classes.textField}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              GB/day
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="outlined-required"
                        label="ES Indexer Rate"
                        value={this.state.esIndexerRate}
                        onChange={handleChange('esIndexerRate')}
                        onFocus={e => (this.onFocusText = e.target.value)}
                        onBlur={this.handleRefresh}
                        className={classes.textField}
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              GB/day
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item sm={3} xs={6}>
                      <TextField
                        id="outlined-required"
                        label="Concurrent Users"
                        value={this.state.noOfConcurrentUsers}
                        onChange={handleChange('noOfConcurrentUsers')}
                        onFocus={e => (this.onFocusText = e.target.value)}
                        onBlur={this.handleRefresh}
                        //defaultValue="30 days"
                        className={classes.textField}
                        //margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
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
                          Operating System
                        </InputLabel>
                        <Select
                          disabled
                          value={this.state.operatingSystem}
                          onChange={handleChange('operatingSystem')}
                          input={
                            <OutlinedInput
                              labelWidth={this.state.labelWidth}
                              name="age"
                              id="outlined-age-simple"
                            />
                          }
                        >
                          {this.state.operatingSystems.map((value, i) => (
                            <MenuItem key={i} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {/* <Paper className={classes.paper}>AWS Region</Paper> */}
                    </Grid>
                  </Grid>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
          <Hidden smDown>
            <Grid item xs={12}>
              <ArchitecturePanel
                architecture={this.state.splunkArchitecture}
                {...this.state}
              />
            </Grid>
          </Hidden>

          <Grid item xs={12}>
            {!this.state.inProgress ? (
              <CostSummary
                computeResources={this.state.result.computeResources}
                storageResources={this.state.result.storageResources}
                billingOption={this.state.billingOption}
                awsSupportTier={this.state.awsSupportTier}
                location={this.state.location}
              />
            ) : (
              <CircularProgress className={classes.progress} />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(SplunkPricing);

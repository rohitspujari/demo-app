import React, { useEffect, useState, Suspense } from 'react';
import { Card, Divider } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import Amplify, { Storage, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import CardActions from '@material-ui/core/CardActions';
import classnames from 'classnames';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { S3Image } from 'aws-amplify-react';
//import Amplify, { Storage } from 'aws-amplify';
import AppBar from '@material-ui/core/AppBar';
import {
  Tabs,
  Grid,
  Paper,
  Chip,
  Tooltip,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Lightbox from 'react-lightbox-component';
import Typography from '@material-ui/core/Typography';
import Image from 'material-ui-image';
import { ChevronLeft, ChevronRight, RotateRight } from '@material-ui/icons';
//import Lightbox from 'react-images-extended';
//import Lightbox from 'react-lightbox-component';
const { height, width } = window.screen;

const PLACEHOLDER_IMAGE_URL =
  'https://cahilldental.ie/wp-content/uploads/2016/10/orionthemes-placeholder-image.png';

const ROTATION = ['0', '90', '180', '270'];
const useStyles = makeStyles(rotate => {
  return {
    root: {
      flexGrow: 1,
      padding: 20
      //backgroundColor: theme.palette.background.paper
    },
    debug: {
      backgroundColor: 'red'
    },
    //rotate: { transform: 'rotate(90deg)' },

    next: {
      marginLeft: 'auto'
    }
  };
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function Details(props) {
  var classes = useStyles();
  const {
    history,
    location: { files, selectedFileId }
  } = props;

  if (!files) {
    history.push('/rekognition');
    return <></>;
  }

  const [fileIndex, setFileIndex] = useState(
    files.findIndex(f => f.id === selectedFileId)
  );
  const [rotationIndex, setRotationIndex] = useState(0);
  const file = files[Math.abs(fileIndex)];
  console.log(file);

  const key = file.key;
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE_URL);
  const [value, setValue] = React.useState(0);
  const [analysis, setAnalysis] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getObjectAnalysis = async () => {
    //console.log('id', key.split('/')[1]);
    const id = key.split('/')[1];
    const { data } = await API.graphql(
      graphqlOperation(queries.getS3Object, {
        id
        //nextToken
      })
    );
    if (data.getS3Object.analysis.items.length > 0) {
      //console.log();
      const result = JSON.parse(data.getS3Object.analysis.items[0].result);
      setAnalysis(result);
      console.log(result);
    }
    //console.log(JSON.parse(data.getS3Object.analysis.items[0].result));
  };

  useEffect(() => {
    Storage.get(key, { level: 'private' })
      .then(url => setImageUrl(url))
      .catch(err => console.log(err));

    getObjectAnalysis();
  }, [fileIndex]);

  // console.log(imageUrl);
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={8}>
          <Button variant="outlined" onClick={() => history.goBack()}>
            Back
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <Paper
            square
            style={{
              padding: 0,

              textAlign: 'center'
              //flexGrow: 1
            }}
          > */}
          {file.prefix === 'image' ? (
            <Image
              src={imageUrl}
              style={{
                transform: `rotate(${ROTATION[rotationIndex]}deg)`,
                width: '100%'

                //paddingTop: '56.25%'
              }}
            />
          ) : (
            // <CardMedia
            //   src="video"
            //   component="video"
            //   className={classes.cover}
            //   image={imageUrl}
            //   //height="140"
            //   title="Live from space album cover"
            // />
            // <div style={{ padding: 10 }}>
            <video
              controls
              style={{
                width: '100%',
                //height: window.screen.height / 2
                height: '50%'
              }}
            >
              // <source src={imageUrl} type="video/webm" />
              // <source src={imageUrl} type="video/mov" />
              // Sorry, your browser doesn't support embedded videos. //{' '}
            </video>
            // </div>
          )}

          <Grid
            item
            style={{ marginTop: 10, marginBottom: 10 }}
            container
            justify="space-between"
          >
            <IconButton style={{ padding: 10 }}>
              <ChevronLeft
                onClick={() => {
                  const nextIndex = (fileIndex - 1) % files.length;
                  console.log(nextIndex);
                  setFileIndex(nextIndex);
                }}
              />
            </IconButton>
            <IconButton
              style={{ padding: 10 }}
              onClick={() => {
                const nextIndex = (rotationIndex + 1) % ROTATION.length;
                setRotationIndex(nextIndex);
              }}
            >
              <RotateRight />
            </IconButton>
            <IconButton style={{ padding: 10 }}>
              <ChevronRight
                onClick={() => {
                  const nextIndex = (fileIndex + 1) % files.length;
                  setFileIndex(nextIndex);
                }}
              />
            </IconButton>
          </Grid>
          <Grid item style={{ textAlign: 'center' }}>
            <Button style={{ marginBottom: 10 }} variant="outlined">
              Upload
            </Button>
          </Grid>
          {/* </Paper> */}
        </Grid>

        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            //variant="scrollable"
            //scrollButtons="auto"
            centered
          >
            <Tab label="Rekognition" />
            <Tab label="Comprehend" />
            <Tab label="Textract" />
          </Tabs>

          {value === 0 && <Reko analysis={analysis} />}
          {value === 1 && <TabContainer>Item Two</TabContainer>}
          {value === 2 && <TabContainer>Item Three</TabContainer>}
          {value === 3 && <TabContainer>Item Four</TabContainer>}
          {value === 4 && <TabContainer>Item Five</TabContainer>}
          {value === 5 && <TabContainer>Item Six</TabContainer>}
          {value === 6 && <TabContainer>Item Seven</TabContainer>}
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(Details);

function Reko({ analysis }) {
  const [panelExpanded, setPanelExpanded] = useState(false);
  const TextPanel = ({ panelExpanded }) => (
    <>
      <ExpansionPanel
        style={{ marginTop: 10 }}
        expanded={panelExpanded}
        onChange={(event, expanded) => {
          setPanelExpanded(panelExpanded ? false : true);
        }}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Detected Text</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid item zeroMinWidth>
            <div style={{ maxHeight: 200, overflow: 'auto' }}>
              {analysis.text.TextDetections.map(i => (
                <div key={i.Id}>
                  <Typography style={{ marginBottom: 5 }}>
                    {i.DetectedText}
                  </Typography>
                  {/* <Divider /> */}
                </div>
              ))}
            </div>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
  const Celebrity = () => (
    <>
      <Typography variant="h6" style={{ marginTop: 10, marginBottom: 0 }}>
        Celebrities
      </Typography>
      <Divider />
      {analysis.celebrities.CelebrityFaces.map(l => (
        <Chip
          style={{ marginRight: 10, marginTop: 10 }}
          key={l.Name}
          label={l.Name}
          variant="outlined"
        />
      ))}
    </>
  );

  //console.log(analysis);
  if (analysis) {
    return (
      <div style={{}}>
        <Typography variant="h6" style={{ marginTop: 10, marginBottom: 0 }}>
          Labels
        </Typography>
        <Divider />
        {analysis.labels.Labels.map(l => (
          <Tooltip key={l.Name} title={Math.floor(l.Confidence) + ' %'}>
            <Chip
              style={{ marginRight: 10, marginTop: 10 }}
              label={l.Name}
              variant="outlined"
            />
          </Tooltip>
        ))}
        {analysis.celebrities.CelebrityFaces.length > 0 && <Celebrity />}
        {analysis.text.TextDetections.length > 0 && (
          <TextPanel panelExpanded={panelExpanded} />
        )}
      </div>
    );
  } else {
    return <></>;
  }
}

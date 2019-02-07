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
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { S3Image } from 'aws-amplify-react';
//import Amplify, { Storage } from 'aws-amplify';
import AppBar from '@material-ui/core/AppBar';
import { Tabs, Grid, Paper } from '@material-ui/core';
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
  console.log('styles');
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

function File(props) {
  //
  var classes = useStyles();
  const {
    match,
    user,
    history,
    location: { files }
  } = props;
  console.log(match);

  if (!files) return <></>;
  //if (!user) return null;
  const { id } = match.params;
  const [fileIndex, setFileIndex] = useState(files.findIndex(f => f.id === id));
  console.log(fileIndex);
  const [rotationIndex, setRotationIndex] = useState(0);

  const key = files[Math.abs(fileIndex)].key;
  const [imageUrl, setImageUrl] = useState(PLACEHOLDER_IMAGE_URL);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getObjectAnalysis = async () => {
    //console.log('id', key.split('/')[1]);
    const { data } = await API.graphql(
      graphqlOperation(queries.getS3Object, {
        id: key.split('/')[1]
        //nextToken
      })
    );
    console.log(JSON.parse(data.getS3Object.analysis.items[0].result));
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
        <Grid container item xs={12} sm={6}>
          <Paper
            style={{
              padding: 0,
              flexGrow: 1
            }}
          >
            <Image
              src={imageUrl}
              style={{
                transform: `rotate(${ROTATION[rotationIndex]}deg)`,
                paddingTop: '56.25%'
              }}
            />
            <Grid container justify="space-between">
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
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
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
          </Paper>
          {value === 0 && <TabContainer>Item One</TabContainer>}
          {value === 1 && <TabContainer>Item Two</TabContainer>}
          {value === 2 && <TabContainer>Item Three</TabContainer>}
          {value === 3 && <TabContainer>Item Four</TabContainer>}
          {value === 4 && <TabContainer>Item Five</TabContainer>}
          {value === 5 && <TabContainer>Item Six</TabContainer>}
          {value === 6 && <TabContainer>Item Seven</TabContainer>}
        </Grid>
      </Grid>
    </div>
    // <Card className={classes.card}>
    //   <CardActionArea>
    //     <CardMedia
    //       className={classes.media}
    //       image={imageUrl}
    //       title="Contemplative Reptile"
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="h2">
    //         Lizard
    //       </Typography>
    //       <Typography component="p">
    //         Lizards are a widespread group of squamate reptiles, with over 6,000
    //         species, ranging across all continents except Antarctica
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button size="small" color="primary">
    //       Share
    //     </Button>
    //     <Button size="small" color="primary">
    //       Learn More
    //     </Button>
    //   </CardActions>
    // </Card>
  );
}

//export default File
export default File;

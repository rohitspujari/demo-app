import React, { useEffect, useState, Suspense } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { S3Image } from 'aws-amplify-react';
import Amplify, { Storage } from 'aws-amplify';
import AppBar from '@material-ui/core/AppBar';
import { Tabs, Grid, Paper } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // width: '100%',
    padding: 20
    //backgroundColor: theme.palette.background.paper
  },
  debug: {
    backgroundColor: 'red'
  },
  card: {
    maxWidth: 700
  },
  media: {
    height: 300
    //maxHeight: 600
  }
}));

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function File({ match, user, history }) {
  const classes = useStyles();
  const { type, fileId } = match.params;
  const s3key = `${type}/${fileId}`;
  const [imageUrl, setImageUrl] = useState();
  const [value, setValue] = React.useState(0);
  const { height, width } = window.screen;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    Storage.get(s3key, { level: 'private' })
      .then(url => setImageUrl(url))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        //className={classes.debug}
        //justify="left"
        //alignItems="center"
        spacing={24}
      >
        <Grid item xs={12} sm={6}>
          <Card>
            <img
              //height={'500'}
              width={width / 2}
              src={imageUrl}
            />
          </Card>
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

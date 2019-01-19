import React, { Component } from 'react';
import Webcam from 'react-webcam';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

export default class WebcamCapture extends Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc);
  };

  render() {
    const { classes } = styles;
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    };

    return (
      <div className={{ flexGrow: 1 }}>
        <Grid
          container
          //direction="row"
          spacing={24}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={6}>
            <Button variant="contained">Default</Button>
          </Grid>
          <Grid item xs={6}>
            {/* <Webcam
              audio={false}
              //   height={350}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              //   width={350}
              videoConstraints={videoConstraints}
            /> */}
          </Grid>
          <Grid item xs={12}>
            <button onClick={this.capture}>Capture photo</button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

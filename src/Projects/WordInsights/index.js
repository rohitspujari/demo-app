import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    //marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
}));

function OutlinedTextFields() {
  const classes = useStyles();
  const [values, setValues] = useState({
    url: 'https://www.youtube.com/watch?v=G_bpUTHsq6c',
    link: ''
  });

  useEffect(() => {
    console.log('useeffect');
    setValues({
      ...values,

      link: values.url.replace('watch?v=', 'embed/')
    });
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const updateUrl = name => event => {
    if (name === 'link') {
      setValues({
        ...values,
        [name]: event.target.value.replace('watch?v=', 'embed/')
      });
    }
  };

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="outlined-full-width"
            label="Video"
            onChange={handleChange('url')}
            onBlur={updateUrl('link')}
            style={{}}
            value={values.url}
            placeholder="Youtube URL"
            helperText=""
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <iframe
            src={values.link}
            width="560"
            height="315"
            frameBorder="0"
            allowFullScreen
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default OutlinedTextFields;

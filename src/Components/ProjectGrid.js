import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProjectCard from './ProjectCard';
import { Auth } from 'aws-amplify';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 2
  }
  // paper: {
  //   padding: theme.spacing.unit * 2,
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary
  // }
});

function FullWidthGrid(props) {
  //console.log(Auth);
  const username = Auth.user.username;

  const { classes, projectList } = props;

  var filteredProjectList = projectList;
  if (username !== 'rohitspujari') {
    filteredProjectList = projectList.filter(f => f.env === 'prod');
  }

  const projects = filteredProjectList.map(p => (
    <Grid key={p.name} item xs={6} sm={3}>
      <ProjectCard
        {...props}
        name={p.name}
        description={p.description}
        navigation={p.navigation}
      />
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        {projects}
      </Grid>
    </div>
  );
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullWidthGrid);

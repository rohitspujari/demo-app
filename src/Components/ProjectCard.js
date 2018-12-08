import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {},
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

function ProjectCard(props) {
  const { classes, name, description, navigation, history } = props;

  return (
    <Card className={classes.card} onClick={() => history.push(navigation)}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom color="primary" variant="h5" component="h2">
            {name}
          </Typography>
          <Typography component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectCard);

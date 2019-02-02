import React from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
    //maxWidth: 752,
    // overflow: 'hidden'
  },
  demo: {
    //backgroundColor: theme.palette.background.paper
  },
  title: {
    //margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  debug: {
    backgroundColor: 'green'
  }
}));

// function generate(element) {
//   return files.map(value =>
//     React.cloneElement(element, {
//       key: value.name
//     })
//   );
// }

function InteractiveList({ files }) {
  //console.log(files);
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  if (files.length === 0) return null;
  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          {/* <Typography variant="h6" className={classes.title}>
            Files
          </Typography> */}

          <List>
            <Grid container>
              {files.map(f => (
                <ListItem key={f.id}>
                  <Grid item xs={2}>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                  </Grid>
                  <Grid item xs={8}>
                    <ListItemText primary={f.name} secondary={f.prefix} />
                  </Grid>
                  <Grid item xs={2}>
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </Grid>
                </ListItem>
              ))}
            </Grid>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default InteractiveList;

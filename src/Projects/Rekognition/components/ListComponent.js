import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';

import LinearProgress from '@material-ui/core/LinearProgress';
import { List, Button } from '@material-ui/core';
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
    flexGrow: 1,
    marginBottom: 20
    //maxWidth: 752,
    // overflow: 'hidden'
    // backgroundColor: 'green'
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

function ListComponent({ files, fetchMoreData, hasMore, deleteItem, history }) {
  const classes = useStyles();
  // const listRef = useRef(null);
  // const [dense, setDense] = React.useState(false);
  // const [secondary, setSecondary] = React.useState(false);

  if (files.length === 0) return <></>;

  return (
    <div className={classes.root}>
      <List>
        {files.map(f => (
          <ListItem
            button
            key={f.id}
            onClick={() => {
              history.push({
                pathname: '/rekognition/details',
                files: files,
                selectedFileId: f.id
              });
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={f.name} secondary={f.prefix} />

            <ListItemSecondaryAction>
              <IconButton
                aria-label="Delete"
                onClick={() => {
                  deleteItem(f.id, f.key);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {!hasMore || (
        <Grid container justify="center">
          <Button onClick={fetchMoreData} variant="outlined">
            Load More
          </Button>
        </Grid>
      )}
    </div>
  );
}

export default withRouter(ListComponent);

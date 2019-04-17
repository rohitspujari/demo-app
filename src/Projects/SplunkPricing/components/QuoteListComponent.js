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
import LinkIcon from '@material-ui/icons/Link';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopy from '@material-ui/icons/FileCopy';
import CopyToClipboard from 'react-copy-to-clipboard';

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

function QuoteListComponent({
  files,
  fetchMoreData,
  hasMore,
  deleteItem,
  history
}) {
  const classes = useStyles();

  if (files.length === 0) return <></>;

  return (
    <div className={classes.root}>
      <List>
        {files.map(f => {
          const link = `https://aws.sonasher.com/splunkpricing?quote=${f.id}`;
          const date = new Date(f.createdAt).toLocaleString();
          return (
            <ListItem key={f.id}>
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <ListItemAvatar>
                    <Avatar>
                      <LinkIcon />
                    </Avatar>
                  </ListItemAvatar>
                </Grid>
                <Grid item xs={6}>
                  <a target="_blank" href={link}>
                    {f.description}
                  </a>

                  {/* <ListItemText primary={f.description} /> */}
                </Grid>
                <Grid item xs={4}>
                  <ListItemText primary={date} />
                </Grid>
                <Grid item xs={1}>
                  {/* <ListItemSecondaryAction> */}
                  <CopyToClipboard text={link}>
                    <IconButton aria-label="Delete" onClick={() => {}}>
                      <FileCopy />
                    </IconButton>
                  </CopyToClipboard>
                  {/* </ListItemSecondaryAction> */}
                </Grid>
              </Grid>

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
          );
        })}
      </List>
      {!hasMore || (
        <Grid container justify="center">
          <Button
            onClick={fetchMoreData}
            // variant="outlined"
          >
            Load More
          </Button>
        </Grid>
      )}
    </div>
  );
}

export default withRouter(QuoteListComponent);

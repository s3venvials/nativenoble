import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#FFF',
    color: '#000',
    top: 'auto',
    bottom: 0
  },
  toolBar: {
    minHeight: '40px'
  }
}));

function Copyright() {
  return (
    <Typography variant="body2">
      {'© '}
      {new Date().getFullYear()}
      {' '}
      All Rights Reserved Store Model | Phoenix, AZ
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Copyright />
        </Toolbar>
      </AppBar>
    </div>
  );
}

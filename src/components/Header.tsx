import React from 'react';
import {
  AppBar, Toolbar, Typography, makeStyles,
} from '@material-ui/core';
// import Weather from '../Features/Weather/Weather';

const useStyles = makeStyles((theme) => ({
  title: {
    lineHeight: 1.2,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      lineHeight: 1,
      fontSize: 16,
    },
  },
}));

export default () => {
  const classes = useStyles();
  const name = "Russell Mantilla's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" color="inherit" className={classes.title}>
          {name} EOG React Visualization Assessment
        </Typography>
        {/* <Weather /> */}
      </Toolbar>
    </AppBar>
  );
};

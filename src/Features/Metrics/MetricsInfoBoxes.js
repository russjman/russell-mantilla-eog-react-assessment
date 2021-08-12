import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';

import { fetchSelectedMetricsInfo } from './metricsSlice';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  card: {
    marginBottom: theme.spacing(2),
  },
}));

export default function MetricsInfoBoxes() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const stateStatus = useSelector(state => state.metrics.status);
  const selectedMetrics = useSelector(state => state.metrics.selected);
  const selectedMetricsInfo = useSelector(state => state.metrics.selectedInfo);

  useEffect(() => {
    if (selectedMetrics.length) {
      dispatch(fetchSelectedMetricsInfo(selectedMetrics));
    }
  }, [selectedMetrics]);

  const renderCard = (item) => {
    const {
      metric, unit, at, value,
    } = item;
    const timeStamp = new Date(at).toUTCString();
    return (
      <Card key={metric} className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>{metric}</Typography>
          <Typography variant="h3">{value}{unit}</Typography>
          <Typography variant="subtitle2" gutterBottom>@{timeStamp}</Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <div hidden={selectedMetrics.length === 0} className={classes.root}>
      <Typography variant="h2" align="center">Info</Typography>
      { stateStatus === 'loading' && <CircularProgress color="secondary" align="center" />}
      {selectedMetricsInfo.map(m => (renderCard(m)))}
    </div>
  );
}

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';

import useInterval from '../../utils/useInterval';
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
  const selectedMetrics = useSelector(state => state.metrics.selected);
  const selectedMetricsInfo = useSelector(state => state.metrics.selectedInfo);

  useEffect(() => {
    if (selectedMetrics.length) {
      dispatch(fetchSelectedMetricsInfo(selectedMetrics));
    }
  }, [selectedMetrics]);

  // recurring chime, doesn't play on prop change.
  useInterval(() => {
    dispatch(fetchSelectedMetricsInfo(selectedMetrics));
  }, selectedMetrics.length ? 10000 : null);

  const renderCard = (item) => {
    const {
      metric, unit, at, value,
    } = item;
    const timeStamp = new Date(at).toUTCString();
    return (
      <Card key={metric} className={classes.card}>
        <CardContent>
          <Typography variant="h5">{metric}</Typography>
          <Typography variant="h4">{value}{unit}</Typography>
          <Typography variant="subtitle2">@{timeStamp}</Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <div hidden={selectedMetrics.length === 0} className={classes.root}>
      <Typography variant="h3" align="center" gutterBottom>Currently</Typography>
      {selectedMetricsInfo.map(m => (renderCard(m)))}
    </div>
  );
}

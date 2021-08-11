import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CircularProgress,
  Container,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import { fetchSelectedMetricsInfo } from './metricsSlice';

export default function MetricsInfoBoxes() {
  const dispatch = useDispatch();
  const stateStatus = useSelector(state => state.metrics.status);
  const selectedMetrics = useSelector(state => state.metrics.selected);
  const selectedMetricsInfo = useSelector(state => state.metrics.selectedInfo);

  useEffect(() => {
    if (selectedMetrics.length) {
      dispatch(fetchSelectedMetricsInfo(selectedMetrics));
    }
  }, [selectedMetrics]);

  console.log('MetricsInfoBoxes', selectedMetrics, selectedMetricsInfo);

  const renderCard = (item) => {
    const {
      metric, unit, at, value,
    } = item;
    const timeStamp = new Date(at).toUTCString();
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>{metric}</Typography>
          <Typography variant="h3">{value}{unit}</Typography>
          <Typography variant="subtitle2" gutterBottom>@{timeStamp}</Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container>
      <Typography variant="h2" align="center">Info</Typography>
      { stateStatus === 'loading' && <CircularProgress color="secondary" align="center" />}
      <Grid container spacing={2}>
        {selectedMetricsInfo.map(m => <Grid key={m.metric} xs={4} item>{renderCard(m)}</Grid>)}
      </Grid>

    </Container>
  );
}

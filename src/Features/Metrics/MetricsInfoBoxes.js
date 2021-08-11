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

  const renderCard = (item) => (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>{item.metric} @ {item.at}</Typography>
        <Typography variant="h3">{item.value}{item.unit}</Typography>
      </CardContent>
    </Card>
  );
  return (
    <Container>
      <Typography variant="h2" align="center">Info</Typography>
      { stateStatus === 'loading' && <CircularProgress color="secondary" align="center" />}
      { stateStatus === 'success' && (
        <Grid container spacing={2}>
          {selectedMetricsInfo.map(m => <Grid xs={4} key={m} item>{renderCard(m)}</Grid>)}
        </Grid>
      )}

    </Container>
  );
}

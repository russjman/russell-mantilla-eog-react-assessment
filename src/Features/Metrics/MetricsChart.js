import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography } from '@material-ui/core';

import { fetchSelectedMetricsChartData } from './metricsSlice';

export default function MetricsChart() {
  const dispatch = useDispatch();

  // const stateStatus = useSelector(state => state.metrics.status);
  const selectedMetrics = useSelector(state => state.metrics.selected);
  const selectedMetricsChartData = useSelector(state => state.metrics.selectedChartData);

  useEffect(() => {
    if (selectedMetrics.length) {
      dispatch(fetchSelectedMetricsChartData(selectedMetrics));
    }
  }, [selectedMetrics]);

  return (
    <Container>
      <Typography variant="h2" align="center">Metrics Chart</Typography>
      {selectedMetricsChartData
        .map(m => <div key={m.metric}>{m.metric}{JSON.stringify(m.measurments)}</div>)}
    </Container>
  );
}

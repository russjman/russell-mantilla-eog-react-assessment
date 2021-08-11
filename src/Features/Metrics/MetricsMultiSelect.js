import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Select,
  MenuItem,
  Chip,
  Typography,
} from '@material-ui/core';

import { deselectMetric, selectMetric, fetchAllMetrics } from './metricsSlice';

function MetricsMultiSelect() {
  const dispatch = useDispatch();
  const metrics = useSelector(state => state.metrics.all);
  const selectedMetrics = useSelector(state => state.metrics.selected);
  const selectHandler = (e) => {
    const { value: allMetrics } = e.target;
    const { [allMetrics.length - 1]: newMetric } = allMetrics;

    if (newMetric && !selectedMetrics.includes(newMetric)) {
      dispatch(selectMetric(newMetric));
    } else {
      dispatch(deselectMetric(newMetric));
    }
  };

  console.log('MetricsMultiSelect', metrics, selectedMetrics);

  useEffect(() => {
    if (!metrics.length) {
      dispatch(fetchAllMetrics());
    }
  }, []);

  return (
    <Container>
      <Typography variant="h2" align="center">Metrics</Typography>
      <Select
        id="metrics-multi-select-field"
        labelId="metrics-multi-select-field"
        value={selectedMetrics}
        onChange={selectHandler}
        multiple
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </div>
        )}
      >
        { metrics.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>) }
      </Select>
    </Container>
  );
}

export default MetricsMultiSelect;

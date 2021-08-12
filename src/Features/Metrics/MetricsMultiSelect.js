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
    const selectedOptions = e.target.value;
    const newMetric = selectedOptions.filter(m => !selectedMetrics.includes(m));

    if (newMetric.length) {
      dispatch(selectMetric(newMetric[0]));
    } else {
      const removedMetric = selectedMetrics.filter(m => !selectedOptions.includes(m));
      dispatch(deselectMetric(removedMetric[0]));
    }
  };

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

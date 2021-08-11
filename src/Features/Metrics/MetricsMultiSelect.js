import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem, Chip } from '@material-ui/core';

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

  if (!metrics.length) {
    dispatch(fetchAllMetrics());
  }

  console.log('MetricsMultiSelect', metrics, selectedMetrics);

  return (
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
      { metrics.map(m => <MenuItem value={m}>{m}</MenuItem>) }
    </Select>
  );
}

export default MetricsMultiSelect;

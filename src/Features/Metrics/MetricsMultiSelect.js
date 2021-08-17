import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  // Container,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import {
  deselectMetric, selectMetric, fetchAllMetrics, clearSelectedMetrics,
} from './metricsSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
    position: 'relative',
    ' & .MuiInputBase-formControl': {
      minHeight: 69,
    },
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 24,
  },
}));

function MetricsMultiSelect() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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

  const clearHandler = () => {
    dispatch(clearSelectedMetrics());
  };

  useEffect(() => {
    if (!metrics.length) {
      dispatch(fetchAllMetrics());
    }
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h1" align="center">Metrics</Typography>
      <FormControl variant="outlined" fullWidth>
        <Select
          id="metrics-multi-select-field"
          labelId="metrics-multi-select-field"
          open={open}
          value={selectedMetrics}
          onClick={() => setOpen(!open)}
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
          <MenuItem value="" selected><em>-- please select metric --</em></MenuItem>
          { metrics.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>) }
        </Select>
      </FormControl>
      <IconButton onClick={clearHandler} className={classes.button}><ClearIcon /></IconButton>
    </div>
  );
}

export default MetricsMultiSelect;

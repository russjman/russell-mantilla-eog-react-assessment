import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Typography, Paper, makeStyles,
} from '@material-ui/core';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import { fetchSelectedMetricsChartData } from './metricsSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  chartContainer: {
    marginBottom: theme.spacing(4),
    width: '100%',
  },
}));

export default function MetricsChart() {
  const dispatch = useDispatch();
  const classes = useStyles();

  // const [ isCombined, setCombined ] = useState(false);
  const selectedMetrics = useSelector(state => state.metrics.selected);
  const selectedMetricsChartData = useSelector(state => state.metrics.selectedChartData);

  useEffect(() => {
    if (selectedMetrics.length) {
      dispatch(fetchSelectedMetricsChartData(selectedMetrics));
    }
  }, [selectedMetrics]);

  return (
    <div className={classes.root} hidden={selectedMetrics.length === 0}>
      <Typography variant="h2" align="center">Metrics Chart</Typography>
      <Button variant="contained" type="button">combined / separate</Button>
      {selectedMetricsChartData.map(m => (
        <Paper key={m.metric} elevation={3} className={classes.chartContainer}>
          <ResponsiveContainer width="99%" height={400}>
            <LineChart data={m.measurements}>
              <XAxis dataKey='at' />
              <YAxis domain={['auto', 'auto']} />
              <CartesianGrid stroke='#f5f5f5' />
              <Tooltip filterNull={false} />
              <Line type='monotone' dataKey='value' stroke='#387908' />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      ))}
    </div>
  );
}

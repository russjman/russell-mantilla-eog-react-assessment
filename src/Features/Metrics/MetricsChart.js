import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Typography, Paper, makeStyles,
} from '@material-ui/core';
import {
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import useInterval from '../../utils/useInterval';
import { fetchSelectedMetricsChartData } from './metricsSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'relative',
  },
  chartContainer: {
    marginBottom: theme.spacing(4),
    width: '100%',
  },
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
    [theme.breakpoints.down('xs')]: {
      position: 'inherit',
      display: 'block',
      margin: '0 auto',
    },
  },
}));

const randomColors = Array.from({ length: 6 },
  () => Math.floor(Math.random() * 16777215).toString(16));

export default function MetricsChart() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [isCombined, setCombined] = useState(true);
  const selectedMetrics = useSelector(state => state.metrics.selected);
  const selectedMetricsChartData = useSelector(state => state.metrics.selectedChartData);

  useEffect(() => {
    if (selectedMetrics.length) {
      dispatch(fetchSelectedMetricsChartData(selectedMetrics));
    }
  }, [selectedMetrics]);

  useInterval(() => {
    dispatch(fetchSelectedMetricsChartData(selectedMetrics));
  }, selectedMetrics.length ? 10000 : null);

  const getMergedChartData = () => {
    const mergedLineData = [];
    selectedMetricsChartData[0].measurements.forEach(m => {
      mergedLineData.push({
        at: m.at,
        [m.metric]: m.value,
      });
    });

    mergedLineData.forEach(point => {
      selectedMetricsChartData.forEach(metric => {
        const found = metric.measurements.find(m => m.at === point.at);
        point[metric.metric] = found.value;
      });
    });

    return mergedLineData;
  };

  return (
    <div className={classes.root} hidden={selectedMetrics.length === 0}>
      <Typography variant="h3" align="center" gutterBottom>
        Last 30 mins
        <Button variant="contained" type="button" color="secondary" className={classes.button} onClick={() => setCombined(!isCombined)}>
          {isCombined ? 'separate' : 'combined' }
        </Button>
      </Typography>

      {!isCombined && selectedMetricsChartData.map((m, i) => (
        <Paper key={`metric-line-chart-${m.metric}`} elevation={3} className={classes.chartContainer}>
          <Typography variant="h4">{m.metric}</Typography>
          <ResponsiveContainer width="99%" height={400}>
            <LineChart data={m.measurements}>
              <XAxis dataKey='at' />
              <YAxis domain={['auto', 'auto']} unit={m.measurements[0].unit} />
              <CartesianGrid stroke='#f5f5f5' />
              <Tooltip filterNull={false} />
              <Line
                dataKey='value'
                stroke={`#${randomColors[i]}`}
                dot={false}
                type='linear'
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      ))}
      {isCombined && selectedMetricsChartData.length && (
        <Paper elevation={3} className={classes.chartContainer}>
          <ResponsiveContainer width="99%" height={500}>
            <LineChart data={getMergedChartData()}>
              <XAxis dataKey='at' />
              <CartesianGrid stroke='#f5f5f5' />
              <Tooltip filterNull={false} />
              {selectedMetricsChartData.map((m) => (
                <YAxis
                  key={`yAxis-${m.metric}`}
                  yAxisId={m.metric}
                  unit={m.measurements[0].unit}
                  label={{
                    value: m.metric, angle: -90, position: 'insideLeft',
                  }}
                />
              ))}
              {selectedMetricsChartData.map((m, i) => (
                <Line
                  key={`metric-line-${m.metric}`}
                  dataKey={m.metric}
                  yAxisId={m.metric}
                  stroke={`#${randomColors[i]}`}
                  dot={false}
                  type='basis'
                  margin={{
                    top: 0, right: 0, bottom: 20, left: 0,
                  }}
                />
              ))}
              <Legend verticalAlign="top" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      )}
    </div>
  );
}

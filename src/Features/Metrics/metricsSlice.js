import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GraphQLClient, gql } from 'graphql-request';

const endPoint = 'https://react.eogresources.com/graphql';
const graphQLClient = new GraphQLClient(endPoint);

export const fetchAllMetrics = createAsyncThunk('metrics/fetchAllMetrics', async () => {
  const query = gql`{ getMetrics }`;
  const data = await graphQLClient.request(query);
  return data.getMetrics;
});

export const fetchSelectedMetricsInfo = createAsyncThunk('metrics/fetchSelectedMetricInfo', async (selectedMetrics) => {
  const query = gql`query ($metricName: String!) {
    getLastKnownMeasurement(metricName: $metricName) {
      metric,
      at,
      value,
      unit,
    }
  }`;

  const promises = selectedMetrics.map(m => graphQLClient.request(query, { metricName: m }));
  const data = await Promise.all(promises);
  return data.map(m => m.getLastKnownMeasurement);
});

export const fetchSelectedMetricsChartData = createAsyncThunk('metrics/fetchSelectedMetricsChartData', async (selectedMetrics) => {
  const query = gql`query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric,
       measurements {
        metric,
        at,
        value,
        unit,
      }
    }
  }`;
  const myCurrentDate = new Date();
  const after = new Date(myCurrentDate);
  after.setMinutes(after.getMinutes() - 1);
  const variables = selectedMetrics.map(m => ({ metricName: m, after: after.valueOf() }));
  const data = await graphQLClient.request(query, { input: [...variables] });
  return data.getMultipleMeasurements;
});

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState: {
    all: [],
    selected: [],
    selectedInfo: [],
    selectedChartData: [],
    error: '',
    status: '',
  },
  reducers: {
    // fetchAll: (state, action) => {
    //   console.log('metricsSlice fetchAll', action);
    //   state.all = action.payload;
    // },
    selectMetric: (state, action) => {
      if (action.payload && !state.selected.includes(action.payload)) {
        state.selected.push(action.payload);
      }
    },
    deselectMetric: (state, action) => {
      const selectedMetrics = [...state.selected];
      state.selected = selectedMetrics.filter(m => m !== action.payload);
    },
  },
  extraReducers: {
    [fetchAllMetrics.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchAllMetrics.fulfilled]: (state, action) => {
      state.status = 'success';
      state.all = action.payload;
    },
    [fetchAllMetrics.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [fetchSelectedMetricsInfo.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchSelectedMetricsInfo.fulfilled]: (state, action) => {
      state.status = 'success';
      state.selectedInfo = action.payload;
    },
    [fetchSelectedMetricsInfo.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [fetchSelectedMetricsChartData.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchSelectedMetricsChartData.fulfilled]: (state, action) => {
      const payload = [...action.payload];

      // format at to time
      payload.forEach(metric => {
        metric.measurements.forEach(point => {
          const time = new Date(point.at);
          point.at = time.toTimeString();
        });
      });
      state.status = 'success';
      state.selectedChartData = action.payload;
    },
    [fetchSelectedMetricsChartData.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectMetric, deselectMetric } = metricsSlice.actions;

export default metricsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GraphQLClient, gql } from 'graphql-request';

const endPoint = 'https://react.eogresources.com/graphql';
const graphQLClient = new GraphQLClient(endPoint);

export const fetchAllMetrics = createAsyncThunk('metrics/fetchAllMetrics', async () => {
  const query = gql`{ getMetrics }`;
  const data = await graphQLClient.request(query);
  return data.getMetrics;
});

export const fetchSelectedMetricInfo = createAsyncThunk('metrics/fetchSelectedMetricInfo', async () => {
  const query = gql`{ getMetrics }`;
  const data = await graphQLClient.request(query);
  return data.getMetrics;
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
      state.selected = selectedMetrics.filter(m => m === action.payload);
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
  },
});

// Action creators are generated for each case reducer function
export const { selectMetric, deselectMetric } = metricsSlice.actions;

export default metricsSlice.reducer;

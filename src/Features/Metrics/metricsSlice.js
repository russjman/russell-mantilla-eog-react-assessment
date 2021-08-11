import { createSlice } from '@reduxjs/toolkit';

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState: {
    all: [],
    selected: [],
  },
  reducers: {
    fetchAll: (state, action) => {
      state.all = action.payload;
    },
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
});

// Action creators are generated for each case reducer function
export const { fetchAll, selectMetric, deselectMetric } = metricsSlice.actions;

export default metricsSlice.reducer;

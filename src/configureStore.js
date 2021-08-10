import { configureStore } from '@reduxjs/toolkit';
import metricsReducer from './Features/Metrics/reducer';

const store = configureStore({
  reducer: {
    metrics: metricsReducer,
  },
});

export default store;

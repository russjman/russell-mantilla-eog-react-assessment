import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem } from '@material-ui/core';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';

import { selectMetric, fetchAll } from './metricsSlice';

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const GET_METRICS = gql`{ getMetrics }`;

const MetricsSelect = function () {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_METRICS);
  const metrics = useSelector(state => state.metrics.all);
  const selectedMetric = useSelector(state => state.metrics.selected);
  const metricsOptions = metrics.map(m => <MenuItem value={m}>{m}</MenuItem>);
  const selectHandler = (e) => {
    dispatch(selectMetric(e.target.value));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  if (data) {
    console.log('data!!!', data);
    dispatch(fetchAll(data.getMetrics));
  }

  console.log('MetricsSelect', selectedMetric, metricsOptions);

  return (
    <ApolloProvider client={client}>
      <Select
        id="metrics-select-field"
        labelId="metrics-select-field"
        value={selectedMetric}
        onChange={selectHandler}
      >
        { metricsOptions }
      </Select>
    </ApolloProvider>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <MetricsSelect />
  </ApolloProvider>
);

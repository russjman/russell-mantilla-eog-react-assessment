import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem, Chip } from '@material-ui/core';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';

import { deselectMetric, selectMetric, fetchAll } from './metricsSlice';

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const GET_METRICS = gql`{ getMetrics }`;

function MetricsMultiSelect() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_METRICS);
  const metrics = useSelector(state => state.metrics.all);
  const selectedMetrics = useSelector(state => state.metrics.selected);
  const selectHandler = (e) => {
    console.log('selectHandler', e);
    const { value: allMetrics } = e.target;
    const { [allMetrics.length - 1]: newMetric } = allMetrics;

    // console.log('selectHandler value', value);
    if (newMetric && !selectedMetrics.includes(newMetric)) {
      dispatch(selectMetric(newMetric));
    } else {
      dispatch(deselectMetric(newMetric));
    }

    dispatch(selectMetric(newMetric));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  if (data) {
    dispatch(fetchAll(data.getMetrics));
  }

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default () => (
  <ApolloProvider client={client}>
    <MetricsMultiSelect />
  </ApolloProvider>
);

import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Card,
  CardContent,
  Grid,
} from '@material-ui/core';

export default function MetricsInfoBoxes() {
  const selectedMetrics = useSelector(state => state.metrics.selected);

  console.log('MetricsInfoBoxes', selectedMetrics);

  const multipleMeasurementsQuery = `
  query($input: [MeasurementQuery]) {
      getMultipleMeasurements(input: $input) {
          metric,
          measurements {
              at,
              value
          }
      }
  }`;

  const multipleMeasurementsVariables = [
    {
      "metricsName": "oilTemp",
    },
    {
      "metricsName": "waterTemp",
    },
  ];

  const renderCard = (metric) => (
    <Card>
      <CardContent>
        <h3>{metric}</h3>
      </CardContent>
    </Card>
  );
  return (
    <Container>
      <h2>Info</h2>
      <Grid container spacing={2}>
        {selectedMetrics.map(m => <Grid xs={4} key={m} item>{renderCard(m)}</Grid>)}
      </Grid>
    </Container>
  );
}

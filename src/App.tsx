import React from 'react';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { Container, Grid, CssBaseline } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Wrapper from './components/Wrapper';
// import NowWhat from './components/NowWhat';
import MetricsMultiSelect from './Features/Metrics/MetricsMultiSelect';
import MetricsInfoBoxes from './Features/Metrics/MetricsInfoBoxes';
import MetricsChart from './Features/Metrics/MetricsChart';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Wrapper>
      <Header />
      <Container>
        <MetricsMultiSelect />
        <Grid spacing={2} container>
          <Grid sm={3} xs={12} item><MetricsInfoBoxes /></Grid>
          <Grid sm={9} xs={12} item><MetricsChart /></Grid>
        </Grid>
      </Container>
      {/* <NowWhat /> */}
      <ToastContainer />
    </Wrapper>
  </MuiThemeProvider>
);

export default App;

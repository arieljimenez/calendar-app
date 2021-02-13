import React from 'react';
import { ThemeProvider } from 'theme-ui'

import { CalendarContainer } from './containers';

import theme from './configs/theme';


interface AppProps {}

function App({}: AppProps) {

  return (
    <ThemeProvider theme={theme}>
      <CalendarContainer />
    </ThemeProvider>
  );
}

export default App;

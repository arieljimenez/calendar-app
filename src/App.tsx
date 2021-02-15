import React from 'react';
import { ThemeProvider } from 'theme-ui'

import { GlobalContextProvider } from './_contexts';

import { CalendarContainer } from './containers';
import theme from './configs/theme';

interface AppProps {}

function App({}: AppProps) {
  return (
    <GlobalContextProvider>
      <ThemeProvider theme={theme}>
        <CalendarContainer />
      </ThemeProvider>
    </GlobalContextProvider>
  );
}

export default App;

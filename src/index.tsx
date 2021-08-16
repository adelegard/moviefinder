import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@material-ui/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import { FavoritesProvider } from './components/favorites';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();
const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
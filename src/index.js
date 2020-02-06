import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme/theme';


ReactDOM.render((
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
), document.getElementById('root'));

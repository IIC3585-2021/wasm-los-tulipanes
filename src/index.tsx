import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { customTheme } from './themes';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.render(
  <ChakraProvider theme={customTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);

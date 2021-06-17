import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // Current version of react-big-calendar generates
  // UNSAFE_componentWillReceiveProps errors
  // https://github.com/jquense/react-big-calendar/issues/1777#issuecomment-835275505
  // disabling strict mode is a workaround to disbale it
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

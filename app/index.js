/**
 * Created by yubh on 2017/12/12.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MyRouter from './router/index';
import configureStore from './store/index';
var FastClick = require('fastclick');

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body);
    },
    false,
  );
}

// Store
ReactDOM.render(
  //组件
  <Provider store={configureStore({})}>
    <MyRouter />
  </Provider>,
  document.getElementById('root'),
);

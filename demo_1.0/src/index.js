import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import All from './All';
import { ConfigProvider, DatePicker, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css'
import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <React.StrictMode>
    <All />
  </React.StrictMode>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

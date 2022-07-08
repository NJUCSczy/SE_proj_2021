import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {  Row, Divider, Space  } from 'antd';
import './Main.css'
import {GithubOutlined} from '@ant-design/icons';

var _ = require('lodash');

function MainPage() {

  return (
    <div className="MainPage" style={{ float: "center" }} >
      <Row justify="center" align="middle" className="main_ground" style={{ backgroundImage: "url(" + require("../images/main.jpeg") + ")" }}>
      <br/>

        <h1 className='main_text'>欢迎来到南京大学测试中心</h1>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Divider style={{color:'white'}}/>
      <div style={{ textAlign: 'center',marginTop:10 }}>
          <p className='main_text'>DESIGNED by GROUP A of 软件工程实验2022</p>
          <GithubOutlined style={{color:'white'}}/>&emsp;<a className='main_text' href="https://github.com/NJUCSczy/SE_proj_2021">Source Code</a>
          <br/>
      <br/>

      </div>
      </Row>

    </div>
  );
}

export default MainPage;
import React, { Component, Fragment } from 'react'
import { Descriptions, Collapse, DatePicker, Divider, Form, Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './ViewFunction.css'
import { getStageByInfo, getStatusInfo, USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions'
import { useEffect, useState } from 'react';
import moment from 'moment';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

var _ = require('lodash');


function ViewFunction(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [entrustData, setEntrustData] = useState({ 'formData': null })
  const { Option } = Select;
  const { TextArea } = Input;
  const { Panel } = Collapse;

  const updateInfo = () => {
    if (USE_JSON_SERVER) {
      fetch("http://localhost:8000/forms/" + _state['PageInfo']['id'], {
        method: "GET",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          console.log(data)
          if (data != null) {
            setEntrustData(prev => {
              const newData = _.cloneDeep(prev)
              newData["formData"] = data
              newData['委托测试软件功能列表'] = data['委托测试软件功能列表']
              return newData
            })
          }
        })
    }
    else {
      fetch(REMOTE_SERVER + "/delegation/" + _state['PageInfo']['id'], {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          'accessToken': _state['accessToken'],
          'tokenType': _state['tokenType'],
          'usrName': _state['userName'],
          'usrID': _state['userID'],
          'usrRole': _state['userRole'][0],
          'Authorization': _state['accessToken']
        },
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          console.log(data)
          if (data != null) {
            setEntrustData(prev => {
              const newData = _.cloneDeep(prev)
              newData["formData"] = data
              newData['委托测试软件功能列表'] = data['functionTable']
              return newData
            })
          }
        })
    }
  }
  useEffect(() => {
    updateInfo();
  }, []
  )


  return (
    entrustData['formData'] === null ? null : (
      <Form style={{ minHeight: 380 }}
        name="委托测试软件功能列表"
        initialValues={{ "项目列表": entrustData['委托测试软件功能列表']['功能项目列表'] }}
      >
        <h1 style={{ textAlign: 'center', fontSize: 30 }}>委托测试软件功能列表</h1>
        <Descriptions
        layout='vertical'
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label={<h4 style={{ fontWeight: 'bolder'}} >软件名称</h4>} >
          <h4 style={{ fontWeight: 'bolder'}} >&emsp;{entrustData['委托测试软件功能列表']['软件名称']}</h4>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
        layout='vertical'
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label={<h4 style={{ fontWeight: 'bolder'}} >版本号</h4>} >
          <h4 style={{ fontWeight: 'bolder'}} >&emsp;{entrustData['委托测试软件功能列表']['版本号']}</h4>
          </Descriptions.Item>
        </Descriptions>
        {entrustData['委托测试软件功能列表']['功能项目列表'].map((index)=>
        <div>
            {index['子功能项目列表'].map((index1)=>
            <div>
              <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                <Panel header={<h4 style={{ fontWeight: 'bolder'}} >项目:{index['软件功能项目']}</h4>} key="1">
                  <Descriptions
                  bordered
                  column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                  >

                      <Descriptions.Item label="软件子功能项目" >
                      <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index1['软件子功能项目']}</h4>
                      </Descriptions.Item>

                      <Descriptions.Item label="功能说明" >
                      <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index1['功能说明']}</h4>
                      </Descriptions.Item>
                  </Descriptions>
                </Panel>
              </Collapse>
            </div>
            )}
        </div>
        )}
      </Form>
    )
  )
}

export default ViewFunction
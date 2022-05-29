import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { Descriptions,DatePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './ViewApplication.css'
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { getStageByInfo, getStatusInfo } from '../../functions/functions'
import { useEffect, useState } from 'react';
import moment from 'moment';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../functions/functions';

var _ = require('lodash');

function ViewApplication(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [entrustData, setEntrustData] = useState({ 'formData': null })
  const { Option } = Select;
  const { TextArea } = Input;

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
              newData['form1'] = data['用户申请表']
              newData['form2'] = data['测试部审核委托']
              newData['form3'] = data['市场部审核委托']
              return newData
            })
          }

        })
    }
    else {
      fetch(REMOTE_SERVER+"/delegation/" + _state['PageInfo']['id'], {
        method: "GET",
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          'accessToken': _state['accessToken'],
          'tokenType': _state['tokenType'],
          'usrName': _state['userName'],
          'usrID': _state['userID'],
          'usrRole': _state['userRole'],
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
              newData['form1'] = data['applicationTable']
              if(data.hasOwnProperty('functionTable'))
              newData['form2'] = data['functionTable']
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


  const getvalue = (name) => {
    if (!entrustData["formData"].hasOwnProperty("测试部审核委托")) {
      return ['软件确认测试'];
    }
    else {
      console.log("FormData")
      return FormData["userInfo"]["用户申请表"][name]
    }
  }



  return (
    entrustData['formData'] === null ? null :
      (<Form
        name="软件项目委托测试申请书">
        
        <h1 style={{ textAlign: 'center', fontSize: 30 }}>软件项目委托测试申请书</h1>

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试类型</h2>
        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>{entrustData['form1']["测试类型"].map(item => (<h3 style={{ fontWeight: 'bolder', marginTop: 10 }} key={item}> {item}</h3>))}</h3>
        <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}> {entrustData['form1']["测试类型(其他)"]}</h4>
        <Checkbox.Group defaultValue={entrustData['form1']["测试类型"]} disabled>
          <Col span={30}>
            <Checkbox value="软件确认测试" style={{ lineHeight: '32px' }}>
              软件确认测试
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="成果/技术鉴定测试" style={{ lineHeight: '32px' }}>
              成果/技术鉴定测试
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="专项资金验收测试" style={{ lineHeight: '32px' }}>
              专项资金验收测试
            </Checkbox>
          </Col>
          <Checkbox value="其他" style={{ lineHeight: '32px' }} >
            其他
            <Input style={{ padding: 0 }} disabled defaultValue={entrustData['form1']["测试类型(其他)"]} />
          </Checkbox>

        </Checkbox.Group>

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h2>
        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>{entrustData['form1']["软件名称"]}</h2>
        <Input style={{ maxWidth: 500 }} defaultValue={entrustData['form1']["软件名称"]} disabled />

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本号</h2>
        <Input style={{ maxWidth: 500 }} defaultValue={entrustData['form1']["版本号"]} disabled />

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>委托单位(中文)</h2>
        <Input style={{ maxWidth: 500 }} defaultValue={entrustData['form1']["委托单位(中文)"]} disabled />

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>委托单位(英文)</h2>
        <Input style={{ maxWidth: 500 }} defaultValue={entrustData['form1']["委托单位(英文)"]} disabled />

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>开发单位</h2>
        <Input style={{ maxWidth: 500 }} defaultValue={entrustData['form1']["开发单位"]} disabled />

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>单位性质</h2>
        <Radio.Group defaultValue={entrustData['form1']["单位性质"]} disabled >
          <Col span={30} >
            <Radio value="内资企业" style={{ lineHeight: '32px' }} >内资企业</Radio>
          </Col>
          <Col span={30}>
            <Radio value="外(合)资企业" style={{ lineHeight: '32px' }}>外(合)资企业</Radio>
          </Col>
          <Col span={30}>
            <Radio value="港澳台(合)资企业" style={{ lineHeight: '32px' }}>港澳台(合)资企业</Radio>
          </Col>
          <Col span={30}>
            <Radio value="科研院校" style={{ lineHeight: '32px' }}>科研院校</Radio></Col>
          <Col span={30}>
            <Radio value="政府事业团体" style={{ lineHeight: '32px' }}>政府事业团体</Radio></Col>
          <Col span={30}>
            <Radio value="其他" style={{ lineHeight: '32px' }}>其他</Radio></Col>
        </Radio.Group>

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件用户对象描述</h2>
        <TextArea rows={5} style={{ maxWidth: 700 }} defaultValue={entrustData['form1']["软件用户对象描述"]} disabled></TextArea>

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>主要功能及用途简介(限300字)</h2>
        <TextArea rows={5} showCount maxLength={300} style={{ maxWidth: 700 }} defaultValue={entrustData['form1']["主要功能及用途简介(限300字)"]} disabled></TextArea>

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试依据</h2>
        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>{entrustData['form1']["测试依据"].map(item => (<h3 style={{ fontWeight: 'bolder', marginTop: 30 }} key={item}> {item}</h3>))}</h3>
        <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}> {entrustData['form1']["测试依据(其他)"]}</h4>
        <Checkbox.Group defaultValue={entrustData['form1']["测试依据"]} disabled>
          <Col span={30}>
            <Checkbox value="GB/T 25000.51-2010" style={{ lineHeight: '32px' }}>
              GB/T 25000.51-2010
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="GB/T 16260.1-2006" style={{ lineHeight: '32px' }}>
              GB/T 16260.1-2006
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="NST-03-WI12-2011" style={{ lineHeight: '32px' }}>
              NST-03-WI12-2011
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="NST-03-WI13-2011" style={{ lineHeight: '32px' }}>
              NST-03-WI13-2011
            </Checkbox>
          </Col>
          <Checkbox value="其他" style={{ lineHeight: '32px' }} >
            其他
            <Input style={{ padding: 0 }} disabled defaultValue={entrustData['form1']["测试依据(其他)"]} />
          </Checkbox>

        </Checkbox.Group>

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>需要测试的技术指标</h2>
        <Checkbox.Group disabled defaultValue={entrustData['form1']["需要测试的技术指标"]}>
          <Col span={30}>
            <Checkbox value="功能性" style={{ lineHeight: '32px' }}>
              功能性
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="可靠性" style={{ lineHeight: '32px' }}>
              可靠性
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="易用性" style={{ lineHeight: '32px' }}>
              易用性
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="效率" style={{ lineHeight: '32px' }}>
              效率
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="可维护性" style={{ lineHeight: '32px' }}>
              可维护性
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="可移植性" style={{ lineHeight: '32px' }}>
              可移植性
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="代码覆盖度" style={{ lineHeight: '32px' }}>
              代码覆盖度
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="缺陷检测率" style={{ lineHeight: '32px' }}>
              缺陷检测率
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="代码风格符合度" style={{ lineHeight: '32px' }}>
              代码风格符合度
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="代码不符合项检测率" style={{ lineHeight: '32px' }}>
              代码不符合项检测率
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="产品说明要求" style={{ lineHeight: '32px' }}>
              产品说明要求
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="用户文档集要求" style={{ lineHeight: '32px' }}>
              用户文档集要求
            </Checkbox>
          </Col>
          <Checkbox value="其他" style={{ lineHeight: '32px' }} >
            其他
            <Input style={{ padding: 0 }} disabled defaultValue={entrustData['form1']["需要测试的技术指标(其他)"]} />
          </Checkbox>

        </Checkbox.Group>

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件规模</h2>

        <div style={{ fontStyle: 'italic', fontWeight: 'lighter' }}>（以下三项请至少选填一项）</div><br></br>
        <h4 style={{ fontWeight: 'bolder' }}>功能数（到最后一级菜单）</h4>
        <Input style={{ maxWidth: 300 }} disabled defaultValue={entrustData['form1']["软件规模"]["功能数(到最后一级菜单)"]} />

        <h4 style={{ fontWeight: 'bolder' }}>功能点数</h4>
        <Input disabled defaultValue={entrustData['form1']["软件规模"]["功能点数"]} style={{ maxWidth: 300 }} />

        <h4 style={{ fontWeight: 'bolder' }}>代码行数(不包括注释行、空行)</h4>
        <Input disabled defaultValue={entrustData['form1']["软件规模"]["代码行数(不包括注释行、空行)"]} style={{ maxWidth: 300 }} />

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件类型(单选)</h2>
        <Radio.Group disabled defaultValue={entrustData['form1']["软件类型"]} >

          <h4 style={{ fontWeight: 'bolder' }}>系统软件</h4>
          <Col span={30} >
            <Radio value="系统软件-操作系统" style={{ lineHeight: '32px' }} >操作系统</Radio>
          </Col>
          <Col span={30}>
            <Radio value="系统软件-中文处理系统" style={{ lineHeight: '32px' }}>中文处理系统</Radio>
          </Col>
          <Col span={30}>
            <Radio value="系统软件-网络系统" style={{ lineHeight: '32px' }}>网络系统</Radio>
          </Col>
          <Col span={30}>
            <Radio value="系统软件-嵌入式操作系统" style={{ lineHeight: '32px' }}>嵌入式操作系统</Radio>
          </Col>
          <Col span={30}>
            <Radio value="系统软件-其他" style={{ lineHeight: '32px' }}>其他</Radio>
          </Col>

          <h4 style={{ fontWeight: 'bolder' }}>支持软件</h4>
          <Col span={30} >
            <Radio value="支持软件-程序设计语言" style={{ lineHeight: '32px' }} >程序设计语言</Radio>
          </Col>
          <Col span={30}>
            <Radio value="支持软件-数据库系统设计" style={{ lineHeight: '32px' }}>数据库系统设计</Radio>
          </Col>
          <Col span={30}>
            <Radio value="支持软件-工具软件" style={{ lineHeight: '32px' }}>工具软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="支持软件-网络通信软件" style={{ lineHeight: '32px' }}>网络通信软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="支持软件-中间件" style={{ lineHeight: '32px' }}>中间件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="支持软件-其他" style={{ lineHeight: '32px' }}>其他</Radio>
          </Col>

          <h4 style={{ fontWeight: 'bolder' }}>应用软件</h4>
          <Col span={30} >
            <Radio value="应用软件-行业管理软件" style={{ lineHeight: '32px' }} >行业管理软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="应用软件-办公软件" style={{ lineHeight: '32px' }}>办公软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="应用软件-模式识别软件" style={{ lineHeight: '32px' }}>模式识别软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="应用软件-图形图像软件" style={{ lineHeight: '32px' }}>图形图像软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="应用软件-控制软件" style={{ lineHeight: '32px' }}>控制软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="应用软件-网络应用软件" style={{ lineHeight: '32px' }}>网络应用软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="应用软件-信息管理软件" style={{ lineHeight: '32px' }}>信息管理软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="应用软件-数据库管理应用软件" style={{ lineHeight: '32px' }}>数据库管理应用软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="应用软件-安全与保密软件" style={{ lineHeight: '32px' }}>安全与保密软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="应用软件-嵌入式应用软件" style={{ lineHeight: '32px' }}>嵌入式应用软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="应用软件-教育软件" style={{ lineHeight: '32px' }}>教育软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="应用软件-游戏软件" style={{ lineHeight: '32px' }}>游戏软件</Radio>
          </Col>
          <Col span={30}>
            <Radio value="应用软件-其他" style={{ lineHeight: '32px' }}>其他</Radio>
          </Col>

          <h4 style={{ fontWeight: 'bolder' }}>其他</h4>
          <Col span={30} >
            <Radio value="其他-其他" style={{ lineHeight: '32px' }} >其他</Radio>
          </Col>
        </Radio.Group>
        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>运行环境</h2>
        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>客户端</h3>
        <h4 style={{ fontWeight: 'bolder' }}>操作系统</h4>
        <Checkbox.Group disabled defaultValue={entrustData['form1']["运行环境"]["客户端"]["操作系统"]} >
          <Col span={30}>
            <Checkbox value="Windows" style={{ lineHeight: '32px' }} >
              <Input addonBefore='Windows' addonAfter='(版本)' style={{ padding: 0 }} disabled defaultValue={entrustData['form1']["运行环境"]["客户端"]["操作系统-Windows版本"]} />
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="Linux" style={{ lineHeight: '32px' }} >
              <Input addonBefore="Linux" addonAfter='(版本)' style={{ padding: 0 }} disabled defaultValue={entrustData['form1']["运行环境"]["客户端"]["操作系统-Linux版本"]} />
            </Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="其他" style={{ lineHeight: '32px' }} >
              <Input addonBefore="其他" style={{ padding: 0 }} disabled defaultValue={entrustData['form1']["运行环境"]["客户端"]["操作系统-其他"]} />
            </Checkbox>
          </Col>
        </Checkbox.Group>

        <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>内存要求</h4>
        <Input addonAfter='MB' style={{ maxWidth: 300 }} disabled defaultValue={entrustData['form1']["运行环境"]["客户端"]["内存要求"]} />

        <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>其他要求</h4>
        <TextArea rows={3} style={{ maxWidth: 700 }} disabled defaultValue={entrustData['form1']["运行环境"]["客户端"]["其他要求"]} />

        <h3 style={{ fontWeight: 'bolder', marginTop: 60 }}>服务器端</h3>
        <h4 style={{ fontWeight: 'bolder', marginTop: 0 }}>硬件</h4>
        <h5 style={{ fontWeight: 'bolder' }}>架构</h5>
        <Checkbox.Group disabled defaultValue={entrustData['form1']["运行环境"]["服务器端"]["硬件"]["架构"]}>
          <Col span={30}>
            <Checkbox value="PC服务器" style={{ lineHeight: '32px' }} >PC服务器</Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="UNIX/Linux服务器" style={{ lineHeight: '32px' }} >UNIX/Linux服务器</Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="其他" style={{ lineHeight: '32px' }} >
              其他
              <Input style={{ padding: 0 }} disabled defaultValue={entrustData['form1']["运行环境"]["服务器端"]["硬件"]["架构-其他"]} />
            </Checkbox>
          </Col>
        </Checkbox.Group>

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>内存要求</h5>
        <Input addonAfter='MB' style={{ maxWidth: 300 }} disabled defaultValue={entrustData['form1']["运行环境"]["服务器端"]["硬件"]["内存要求"]} />

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>硬盘要求</h5>
        <Input addonAfter='MB' style={{ maxWidth: 300 }} disabled defaultValue={entrustData['form1']["运行环境"]["服务器端"]["硬件"]["硬盘要求"]} />

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>其他要求</h5>
        <TextArea rows={3} style={{ maxWidth: 700 }} disabled defaultValue={entrustData['form1']["运行环境"]["服务器端"]["硬件"]["其他要求"]} />

        <h4 style={{ fontWeight: 'bolder', marginTop: 60 }}>软件</h4>
        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>操作系统</h5>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["运行环境"]["服务器端"]["软件"]["操作系统"]} />

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本</h5>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["运行环境"]["服务器端"]["软件"]["版本"]} />

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>编程语言</h5>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["运行环境"]["服务器端"]["软件"]["编程语言"]} />

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>构架</h5>
        <Checkbox.Group disabled defaultValue={entrustData['form1']["运行环境"]["服务器端"]["软件"]["架构"]}>
          <Col span={30}>
            <Checkbox value="C/S" style={{ lineHeight: '32px' }} >C/S</Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="B/S" style={{ lineHeight: '32px' }} >B/S</Checkbox>
          </Col>
          <Col span={30}>
            <Checkbox value="其他" style={{ lineHeight: '32px' }} >
              其他
            </Checkbox>
          </Col>
        </Checkbox.Group>

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>数据库</h5>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["运行环境"]["服务器端"]["软件"]["数据库"]} />

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>中间件</h5>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["运行环境"]["服务器端"]["软件"]["中间件"]} />

        <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>其他支撑软件</h5>
        <TextArea rows={3} style={{ maxWidth: 700 }} disabled defaultValue={entrustData['form1']["运行环境"]["服务器端"]["软件"]["其他支撑软件"]} />

        <h3 style={{ fontWeight: 'bolder', marginTop: 60 }}>网络环境</h3>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["运行环境"]["网络环境"]} />

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>样品和数量</h2>
        <h3 style={{ fontWeight: 'bolder', marginTop: 0 }}>软件介质</h3>
        <Radio.Group disabled defaultValue={entrustData['form1']["样品和数量"]["软件介质"]}>
          <Col span={30} >
            <Radio value="光盘" style={{ lineHeight: '32px' }} >光盘</Radio>
          </Col>
          <Col span={30}>
            <Radio value="U盘" style={{ lineHeight: '32px' }}>U盘</Radio>
          </Col>
          <Col span={30}>
            <Radio value="其他" style={{ lineHeight: '32px' }} >
              其他
              <Input style={{ padding: 0 }} disabled defaultValue={entrustData['form1']["样品和数量"]["软件介质(其他)"]} />
            </Radio>
          </Col>
        </Radio.Group>

        <h3 style={{ fontWeight: 'bolder', marginTop: 60 }}>提交的样品(硬拷贝资料、硬件)五年保存期满后</h3>
        <Radio.Group disabled defaultValue={entrustData['form1']["样品和数量"]["提交的样品(硬拷贝资料、硬件)五年保存期满后"]} >
          <Col span={30} >
            <Radio value="由本实验室销毁 " style={{ lineHeight: '32px' }} >由本实验室销毁 </Radio>
          </Col>
          <Col span={30}>
            <Radio value="退还给我们" style={{ lineHeight: '32px' }}>退还给我们</Radio>
          </Col>
        </Radio.Group>

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>希望测试完成时间</h2>
        <DatePicker disabled defaultValue={moment((entrustData['form1']["希望测试完成时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD' />

        <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>委托单位信息</h2>
        <h3 style={{ fontWeight: 'bolder', marginTop: 0 }}>电话</h3>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["委托单位信息"]["电话"]} />

        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>传真</h3>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["委托单位信息"]["传真"]} />

        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>地址</h3>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["委托单位信息"]["地址"]} />

        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>邮编</h3>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["委托单位信息"]["邮编"]} />

        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>联系人</h3>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["委托单位信息"]["联系人"]} />

        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>手机</h3>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["委托单位信息"]["手机"]} />

        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>E-mail</h3>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["委托单位信息"]["E-mail"]} />

        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>网址</h3>
        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['form1']["委托单位信息"]["网址"]} />
        {getStageByInfo(entrustData['formData']) < 3 ? null : (
          <div>
            <h1 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试部审核结果</h1>
            <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>密级</h2>
            <Radio.Group disabled defaultValue={entrustData["formData"]["测试部审核委托"]["密级"]}>
              <Col span={30} >
                <Radio value="无密级" style={{ lineHeight: '32px' }} >无密级</Radio>
              </Col>
              <Col span={30}>
                <Radio value="秘密" style={{ lineHeight: '32px' }}>秘密</Radio>
              </Col>
              <Col span={30}>
                <Radio value="机密" style={{ lineHeight: '32px' }}>机密</Radio>
              </Col>
            </Radio.Group>

            <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>查杀病毒</h2>
            <Checkbox.Group disabled defaultValue={entrustData["formData"]["测试部审核委托"]["查杀病毒"]}>
              <Col span={30}>
                <Checkbox value="已完成" style={{ lineHeight: '32px' }}>
                  已完成
                </Checkbox>
              </Col>
              <Checkbox value="未完成" style={{ lineHeight: '32px' }}>
                其他
                <Input style={{ padding: 0 }} disabled defaultValue={entrustData["formData"]["测试部审核委托"]["查杀工具"]} />
              </Checkbox>
            </Checkbox.Group>

            <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>材料检查</h2>
            <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试样品</h3>
            <Checkbox.Group disabled defaultValue={entrustData["formData"]["测试部审核委托"]["材料检查"]["测试样品"]} >
              <Col span={30}>
                <Checkbox value="源代码" style={{ lineHeight: '32px' }}>
                  源代码
                </Checkbox>
              </Col>
              <Col span={30}>
                <Checkbox value="可执行文件" style={{ lineHeight: '32px' }}>
                  可执行文件
                </Checkbox>
              </Col>
            </Checkbox.Group>

            <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>需求文档</h3>
            <Checkbox.Group disabled defaultValue={entrustData["formData"]["测试部审核委托"]["材料检查"]["需求文档"]} >
              <Col span={30}>
                <Checkbox value="项目计划任务书" style={{ lineHeight: '32px' }}>
                  项目计划任务书
                </Checkbox>
              </Col>
              <Col span={30}>
                <Checkbox value="需求分析报告" style={{ lineHeight: '32px' }}>
                  需求分析报告
                </Checkbox>
              </Col>
              <Col span={30}>
                <Checkbox value="合同" style={{ lineHeight: '32px' }}>
                  合同
                </Checkbox>
              </Col>
            </Checkbox.Group>

            <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>用户文档</h3>
            <Checkbox.Group disabled defaultValue={entrustData["formData"]["测试部审核委托"]["材料检查"]["用户文档"]} >
              <Col span={30}>
                <Checkbox value="用户手册" style={{ lineHeight: '32px' }}>
                  用户手册
                </Checkbox>
              </Col>
              <Col span={30}>
                <Checkbox value="用户指南" style={{ lineHeight: '32px' }}>
                  用户指南
                </Checkbox>
              </Col>
            </Checkbox.Group>

            <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>操作文档</h3>
            <Checkbox.Group disabled defaultValue={entrustData["formData"]["测试部审核委托"]["材料检查"]["操作文档"]} >
              <Col span={30}>
                <Checkbox value="操作员手册" style={{ lineHeight: '32px' }}>
                  操作员手册
                </Checkbox>
              </Col>
              <Col span={30}>
                <Checkbox value="安装手册" style={{ lineHeight: '32px' }}>
                  安装手册
                </Checkbox>
              </Col>
              <Col span={30}>
                <Checkbox value="诊断手册" style={{ lineHeight: '32px' }}>
                  诊断手册
                </Checkbox>
              </Col>
              <Col span={30}>
                <Checkbox value="支持手册" style={{ lineHeight: '32px' }}>
                  支持手册
                </Checkbox>
              </Col>
            </Checkbox.Group>

            <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>其它</h3>
            <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData["formData"]["测试部审核委托"]["材料检查"]["其它"]} />

            <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>确认意见</h2>
            <Radio.Group disabled defaultValue={entrustData["formData"]["测试部审核委托"]["确认意见"]} >
              <Col span={30} >
                <Radio value="材料不全" style={{ lineHeight: '32px' }} >测试所需材料不全，未达到受理条件。</Radio>
              </Col>
              <Col span={30}>
                <Radio value="可以测试" style={{ lineHeight: '32px' }}>属依据国家标准或自编非标规范进行的常规检测，有资质、能力和资源满足委托方要求。</Radio>
              </Col>
              <Col span={30}>
                <Radio value="不符合标准或者缺乏设备" style={{ lineHeight: '32px' }}>无国家标准和规范依据，或实验室缺乏检测设备和工具，无法完成检测。</Radio>
              </Col>
              <Col span={30}>
                <Radio value="超出能力范围" style={{ lineHeight: '32px' }}>超出实验室能力和资质范围，无法完成检测。</Radio>
              </Col>
            </Radio.Group>
          </div>
        )}
        {getStageByInfo(entrustData['formData']) < 5 ? null : (
          <div>
            <h1 style={{ fontWeight: 'bolder', marginTop: 30 }}>市场部审核结果</h1>
            <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>市场部受理意见</h2>
            <Radio.Group disabled defaultValue={entrustData["formData"]["市场部审核委托"]["市场部受理意见"]} >
              <Col span={30} >
                <Radio value="受理" style={{ lineHeight: '32px' }} >受理</Radio>
              </Col>
              <Col span={30}>
                <Radio value="不受理" style={{ lineHeight: '32px' }}>不受理</Radio>
              </Col>
              <Col span={30}>
                <Radio value="需进一步审理" style={{ lineHeight: '32px' }}>需进一步审理</Radio>
              </Col>
            </Radio.Group>
            {getStageByInfo(entrustData['formData']) > 6 ? (
              <div>
                <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试项目编号</h2>
                <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData["formData"]["市场部审核委托"]["测试项目编号"]} />
              </div>) : null
            }
            {getStageByInfo(entrustData['formData']) > 6 ? (
              <div>
                <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>市场部备注</h2>
                <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData["formData"]["市场部审核委托"]["市场部备注"]} />
              </div>) : null
            }
            {getStageByInfo(entrustData['formData']) === 6 ? (
              <div>
                <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>进一步审理方向及原因</h2>
                <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData["formData"]["市场部审核委托"]["进一步审理方向及原因"]} />
              </div>) : null
            }
          </div>
        )}
      </Form>
      )
  )
}


export default ViewApplication
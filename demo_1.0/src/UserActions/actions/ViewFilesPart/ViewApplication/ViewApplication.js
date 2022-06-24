import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { Collapse, Descriptions,DatePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './ViewApplication.css'
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { USE_JSON_SERVER,REMOTE_SERVER,getStageByInfo, getStatusInfo } from '../../../functions/functions';
import DescriptionsItem from 'antd/lib/descriptions/Item';

var _ = require('lodash');

function ViewApplication(props) {
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


  return (
    entrustData['formData'] === null ? null :
      (<Form
        name="软件项目委托测试申请书">

        <Descriptions
          title={<h1 style={{ textAlign: 'center', fontSize: 30 }}>软件项目委托测试申请书</h1>}
          layout='vertical'
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="测试类型"  >
          <h4>{entrustData['form1']["测试类型"].map(
            item=>(<h4 style={{ fontWeight: 'bolder', marginTop: 10 }} key={item}> {item}</h4>)
            )}</h4>
          {(entrustData['form1'].hasOwnProperty("测试类型(其他)"))?
          ( 
            <div>
            {(entrustData['form1']["测试类型(其他)"]!=null)?(
              <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >(其他:{entrustData['form1']["测试类型(其他)"]})</h4>
            ):null}
            </div>
          )
          :null}
          </Descriptions.Item>

          <Descriptions.Item label="软件名称" span={3}>
          <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['form1']["软件名称"]}</h4>
          </Descriptions.Item>

          <Descriptions.Item label="版本号" >
          <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['form1']["版本号"]}</h4>
          </Descriptions.Item>

          <Descriptions.Item label="开发单位" >
          <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['form1']["开发单位"]}</h4>
          </Descriptions.Item>

          <Descriptions.Item label="单位性质"  >
          <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['form1']["单位性质"]}</h4>
          </Descriptions.Item>

          <Descriptions.Item label="委托单位(中文)" span={1}>
          <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['form1']["委托单位(中文)"]}</h4>
          </Descriptions.Item>

          <Descriptions.Item label="委托单位(英文)" span={2}>
          <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['form1']["委托单位(英文)"]}</h4>
          </Descriptions.Item>

          

          <Descriptions.Item label="软件用户对象描述"  span={3}>
          <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['form1']["软件用户对象描述"]}</h4>
          </Descriptions.Item>

          <Descriptions.Item label="主要功能及用途简介(限300字)"  span={3}>
          <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['form1']["主要功能及用途简介(限300字)"]}</h4>
          </Descriptions.Item>

          <Descriptions.Item label="测试依据"  span={1}>
          <h4>{entrustData['form1']["测试依据"].map(
            item=>(<h4 style={{ fontWeight: 'bolder', marginTop: 10 }} key={item}> {item}</h4>)
            )}</h4>
          {(entrustData['form1'].hasOwnProperty("测试依据(其他)"))?
          ( 
            <div>
            {(entrustData['form1']["测试依据(其他)"]!=null)?(
              <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >(其他:{entrustData['form1']["测试依据(其他)"]})</h4>
            ):null}
            </div>
          )
          :null}
          </Descriptions.Item>

          <Descriptions.Item label="需要测试的技术指标"  span={1}>
          <h4>{entrustData['form1']["需要测试的技术指标"].map(
            item=>(<h4 style={{ fontWeight: 'bolder', marginTop: 10 }} key={item}> {item}</h4>)
            )}</h4>
          {(entrustData['form1'].hasOwnProperty("需要测试的技术指标(其他)"))?
          ( 
            <div>
            {(entrustData['form1']["需要测试的技术指标(其他)"]!=null)?(
              <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >(其他:{entrustData['form1']["需要测试的技术指标(其他)"]})</h4>
            ):null}
            </div>
          )
          :null}
          </Descriptions.Item>

          <Descriptions.Item label="软件类型"  span={1}>
          <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['form1']["软件类型"]}</h4>
          </Descriptions.Item>



        </Descriptions>

        <Collapse  bordered={false} ghost>
          <Panel header="软件规模" key="1">
            <Descriptions
            layout='vertical'
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
              <Descriptions.Item label="功能数(到最后一级菜单)" >
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["软件规模"]["功能数(到最后一级菜单)"]}</h4>
              </Descriptions.Item>

              <Descriptions.Item label="功能点数" >
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["软件规模"]["功能点数"]}</h4>
              </Descriptions.Item>

              <Descriptions.Item label="代码行数(不包括注释行、空行)" >
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["软件规模"]["代码行数(不包括注释行、空行)"]}</h4>
              </Descriptions.Item>


            </Descriptions>
          </Panel>
        </Collapse>

        <Collapse title="运行环境"  bordered={false} ghost>
          <Panel header="客户端" key="1">
            <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            bordered
            layout='vertical'>
              <Descriptions.Item label="操作系统" >
                {(entrustData['form1']["运行环境"]["客户端"].hasOwnProperty("操作系统-Windows版本"))?
                ( 
                  <div>
                  {(entrustData['form1']["运行环境"]["客户端"]["操作系统-Windows版本"]!=null)?(
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >Windows版本:{entrustData['form1']["运行环境"]["客户端"]["操作系统-Windows版本"]}</h4>
                  ):null}
                  </div>
                )
                :null}

                {(entrustData['form1']["运行环境"]["客户端"].hasOwnProperty("操作系统-Linux版本"))?
                ( 
                  <div>
                  {(entrustData['form1']["运行环境"]["客户端"]["操作系统-Linux版本"]!=null)?(
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >Linux版本:{entrustData['form1']["运行环境"]["客户端"]["操作系统-Linux版本"]}</h4>
                  ):null}
                  </div>
                )
                :null}

                {(entrustData['form1']["运行环境"]["客户端"].hasOwnProperty("操作系统-其他"))?
                ( 
                  <div>
                  {(entrustData['form1']["运行环境"]["客户端"]["操作系统-其他"]!=null)?(
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >其他:{entrustData['form1']["运行环境"]["客户端"]["操作系统-其他"]}</h4>
                  ):null}
                  </div>
                )
                :null}
              </Descriptions.Item>

              <Descriptions.Item label="内存要求" >
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["运行环境"]["客户端"]["内存要求"]}</h4>
              </Descriptions.Item>

              <Descriptions.Item label="其他要求" >
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["运行环境"]["客户端"]["其他要求"]}</h4>
              </Descriptions.Item>
              
            </Descriptions>
          </Panel>
          <Panel header="服务器端" key="2">
            <Collapse bordered={false} ghost>
              <Panel header="硬件" key="1">
                <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                bordered
                layout='vertical'>
                  <Descriptions.Item label="架构" >
                  <h4>{entrustData['form1']["运行环境"]["服务器端"]["硬件"]["架构"].map(
                    item=>(<h4 style={{ fontWeight: 'bolder', marginTop: 10 }} key={item}> {item}</h4>)
                    )}</h4>
                  {(entrustData['form1']["运行环境"]["服务器端"]["硬件"].hasOwnProperty("架构-其他"))?
                  ( 
                    <div>
                    {(entrustData['form1']["运行环境"]["服务器端"]["硬件"]["架构-其他"]!=null)?(
                      <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >(其他:{entrustData['form1']["运行环境"]["服务器端"]["硬件"]["架构-其他"]})</h4>
                    ):null}
                    </div>
                  )
                  :null}
                  </Descriptions.Item>

                  <Descriptions.Item label="内存要求" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["运行环境"]["服务器端"]["硬件"]["内存要求"]}</h4>
                  </Descriptions.Item>

                  <Descriptions.Item label="硬盘要求" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["运行环境"]["服务器端"]["硬件"]["硬盘要求"]}</h4>
                  </Descriptions.Item>

                  <Descriptions.Item label="其他要求" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["运行环境"]["服务器端"]["硬件"]["其他要求"]}</h4>
                  </Descriptions.Item>
                  
                </Descriptions>
              </Panel>
              <Panel header="软件" key="2">
                <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                bordered
                layout='vertical'>
                  

                  <Descriptions.Item label="操作系统" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["运行环境"]["服务器端"]["软件"]["操作系统"]}</h4>
                  </Descriptions.Item>

                  <Descriptions.Item label="版本" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["运行环境"]["服务器端"]["软件"]["版本"]}</h4>
                  </Descriptions.Item>

                  <Descriptions.Item label="编程语言" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["运行环境"]["服务器端"]["软件"]["编程语言"]}</h4>
                  </Descriptions.Item>

                  <Descriptions.Item label="构架" >
                  <h4>{entrustData['form1']["运行环境"]["服务器端"]["软件"]["架构"].map(
                    item=>(<h4 style={{ fontWeight: 'bolder', marginTop: 10 }} key={item}> {item}</h4>)
                    )}</h4>
                  </Descriptions.Item>

                  <Descriptions.Item label="数据库" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["运行环境"]["服务器端"]["软件"]["数据库"]}</h4>
                  </Descriptions.Item>

                  <Descriptions.Item label="中间件" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["运行环境"]["服务器端"]["软件"]["中间件"]}</h4>
                  </Descriptions.Item>

                  <Descriptions.Item label="其他支撑软件" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["运行环境"]["服务器端"]["软件"]["其他支撑软件"]}</h4>
                  </Descriptions.Item>
                  
                </Descriptions>
              </Panel>
            </Collapse>
          </Panel>
          <Panel header="网络环境" key="3">
            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["运行环境"]["网络环境"]}</h4>
          </Panel>
        </Collapse>

        <Collapse  bordered={false} ghost>
          <Panel header="样品和数量" key="1">
            <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            bordered
            layout='vertical'>
              <Descriptions.Item label="软件介质">
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["样品和数量"]["软件介质"]}</h4>
              </Descriptions.Item>

              <Descriptions.Item label="提交的样品(硬拷贝资料、硬件)五年保存期满后">
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["样品和数量"]["提交的样品(硬拷贝资料、硬件)五年保存期满后"]}</h4>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
        </Collapse>

        <Collapse  bordered={false} ghost>
          <Panel header="希望测试完成时间" key="1">
          <DatePicker disabled defaultValue={moment((entrustData['form1']["希望测试完成时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD' />
          </Panel>
        </Collapse>
        

        <Collapse  bordered={false} ghost>
          <Panel header="委托单位信息" key="1">
            <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            bordered
            layout='vertical'>
              <Descriptions.Item label="电话">
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["委托单位信息"]["电话"]}</h4>
              </Descriptions.Item>

              <Descriptions.Item label="传真">
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["委托单位信息"]["传真"]}</h4>
              </Descriptions.Item>

              <Descriptions.Item label="地址">
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["委托单位信息"]["地址"]}</h4>
              </Descriptions.Item>

              <Descriptions.Item label="邮编">
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["委托单位信息"]["邮编"]}</h4>
              </Descriptions.Item>

              <Descriptions.Item label="联系人">
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["委托单位信息"]["联系人"]}</h4>
              </Descriptions.Item>

              <Descriptions.Item label="手机">
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["委托单位信息"]["手机"]}</h4>
              </Descriptions.Item>

              <Descriptions.Item label="E-mail">
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["委托单位信息"]["E-mail"]}</h4>
              </Descriptions.Item>

              <Descriptions.Item label="网址">
                <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData['form1']["委托单位信息"]["网址"]}</h4>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
        </Collapse>

        {getStageByInfo(entrustData['formData']) < 4 ? null : (
          <Collapse  bordered={false} ghost>
            <Panel header="测试部审核结果" key="1">
              <Collapse bordered={false} ghost>
                <Panel header="材料检查" key="1">
                  <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                  bordered
                  layout='vertical'>
                    <Descriptions.Item label="测试样品">
                      <h4>{entrustData["formData"]["测试部审核委托"]["材料检查"]["测试样品"].map(
                      item=>(<h4 style={{ fontWeight: 'bolder', marginTop: 10 }} key={item}> {item}</h4>)
                      )}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="需求文档">
                      <h4>{entrustData["formData"]["测试部审核委托"]["材料检查"]["需求文档"].map(
                        item=>(<h4 style={{ fontWeight: 'bolder', marginTop: 10 }} key={item}> {item}</h4>)
                        )}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="用户文档">
                      <h4>{entrustData["formData"]["测试部审核委托"]["材料检查"]["用户文档"].map(
                      item=>(<h4 style={{ fontWeight: 'bolder', marginTop: 10 }} key={item}> {item}</h4>)
                      )}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="操作文档">
                      <h4>{entrustData["formData"]["测试部审核委托"]["材料检查"]["操作文档"].map(
                      item=>(<h4 style={{ fontWeight: 'bolder', marginTop: 10 }} key={item}> {item}</h4>)
                      )}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="其它">
                      <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData["formData"]["测试部审核委托"]["材料检查"]["其它"]}</h4>
                    </Descriptions.Item>
                  </Descriptions>
                </Panel>
              </Collapse>
              <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              bordered
              layout='vertical'>
                <Descriptions.Item label="密级">
                  <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData["formData"]["测试部审核委托"]["密级"]}</h4>
                </Descriptions.Item>

                <Descriptions.Item label="查杀病毒">
                  <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData["formData"]["测试部审核委托"]["查杀病毒"]}</h4>
                  {(entrustData["formData"]["测试部审核委托"].hasOwnProperty("查杀工具"))?
                  ( 
                    <div>
                    {(entrustData["formData"]["测试部审核委托"]["查杀工具"]!=null)?(
                      <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >(使用查杀工具:{entrustData["formData"]["测试部审核委托"]["查杀工具"]})</h4>
                    ):null}
                    </div>
                  )
                  :null}
                </Descriptions.Item>

                <Descriptions.Item label="确认意见">
                  <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData["formData"]["测试部审核委托"]["确认意见"]}</h4>
                </Descriptions.Item>
              </Descriptions>
            </Panel>
          </Collapse>
        )}

        {getStageByInfo(entrustData['formData']) < 6 ? null:(
          <div>
          <Collapse  bordered={false} ghost>
            <Panel header="市场部审核结果" key='1'>
              <Descriptions column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
              bordered
              layout='vertical'>
                <Descriptions.Item label="市场部受理意见">
                  <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData["formData"]["市场部审核委托"]["市场部受理意见"]}</h4>
                </Descriptions.Item>

                {getStageByInfo(entrustData['formData']) > 7 ?(
                  <Descriptions.Item label="测试项目编号">
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData["formData"]["市场部审核委托"]["测试项目编号"]}</h4>
                  </Descriptions.Item>
                ):null}

                {getStageByInfo(entrustData['formData']) > 7 ?(
                  <Descriptions.Item label="市场部备注">
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData["formData"]["市场部审核委托"]["市场部备注"]}</h4>
                  </Descriptions.Item>
                ):null}
                

                {getStageByInfo(entrustData['formData']) === 7 ?(
                  <Descriptions.Item label="进一步审理方向及原因">
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }}>{entrustData["formData"]["市场部审核委托"]["进一步审理方向及原因"]}</h4>
                  </Descriptions.Item>
                ):null}
              </Descriptions>
            </Panel>
          </Collapse>
          </div>
        )}  
      </Form>
      )
  )
}


export default ViewApplication
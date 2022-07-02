import React ,{ Fragment }from 'react'
import isMobile from 'is-mobile';

import {Descriptions, DatePicker, message, Divider,Tag,Table, Form,Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import {  useEffect, useState } from 'react';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import moment from 'moment';
import { MinusCircleOutlined, PlusOutlined,CloseOutlined, CheckOutlined } from '@ant-design/icons';

import FormItem from 'antd/lib/form/FormItem';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';
function Viewtsreviewform(props) {
    const { UpdateUserInfo, GotoPage, _state, focusedData } = props;
    const [formData, setFormData] = useState({})
    const [entrustData, setEntrustData] = useState({ 'formData': null, '测试方案评审表': null })
    const { Option } = Select;
    const { TextArea } = Input;
    const mobile = require('is-mobile');
    var _ = require('lodash');

    const { Column, ColumnGroup } = Table;




    const setDataByKey = (key, val) => {
      setFormData(prev => {
        const newFormData = _.cloneDeep(prev)
        newFormData[key] = val;
        console.log(newFormData)
        return newFormData;
      })
  
    }

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
                            newData['测试方案评审表'] = data['测试方案评审表']
                            return newData
                        })
                    }
                })
        }
        else {
            fetch(REMOTE_SERVER + "/test/" + _state['PageInfo']['id']+"/test-scheme/audit-table", {
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
                    if (res.status != 200) {
                        alert('查询测试方案评审表失败！')
                        return null
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    if (data != null) {
                        setEntrustData(prev => {
                            const newData = _.cloneDeep(prev)
                            
                            newData['测试方案评审表'] = data['TestSchemeAuditTableDto']
                            return newData
                        })
                    }
                })
        }
    }
    useEffect(() => {
        if (focusedData === undefined)
            updateInfo();
        else{
            setEntrustData(prev => {
                const newData = _.cloneDeep(prev)
                newData['测试方案评审表'] = focusedData
                return newData
            })
        }  
    }, []
    )

    const columns =[
        {
          title:'职责',
          dataIndex:'duty',
        },
        {
          title:'评审意见',
          dataIndex:'opinion',
          render:(_, record,index) => (
            <Form.Item name={'opinion_'+index} initialValue={''}>
            <h5 style={{fontWeight: 'bolder', marginTop: 30}}>{entrustData['测试方案评审表']['opinion_'+index]}</h5>
            </Form.Item>
          ),
          
        },
        {
          title:'签字',
          dataIndex:'sign',
          render:(_, record,index) => (
            <Form.Item name={'sign_'+index}>
                <h5 style={{fontWeight: 'bolder', marginTop: 30}}>{entrustData['测试方案评审表']['sign_'+index]}</h5>
            </Form.Item>
          ),
        },
        {
          title:'日期',
          dataIndex:'date',
          render:(_, record,index) => (
            <Form.Item name={'date_'+index}>
                <DatePicker disabled defaultValue={moment((entrustData['测试方案评审表']['date_'+index]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>
            </Form.Item>
          ),
        },
        
      ];

      const data=[
        {
          key:'2',
          content:'《测试方案》书写规范性',
        },
        {
          key:'3',
          content:'测试环境是否具有典型意义以及是否符合用户要求',
        },
        {
          key:'4',
          content:'测试内容的完整性，是否覆盖了整个系统',
        },
        {
          key:'5',
          content:'测试方法的选取是否合理',
        },
        {
          key:'6',
          content:'测试用例能否覆盖问题',
        },
        {
          key:'7',
          content:'输入、输出数据设计合理性',
        },
        {
          key:'8',
          content:'测试时间安排是否合理',
        },
        {
          key:'9',
          content:'测试人力资源安排是否合理',
        },
        
      
      ];
      
      const data1=[
          {
              duty:'测试工程师',
          },
          {
              duty:'测试室负责人',
          },
          {
              duty:'质量负责人',
          },
          {
              duty:'技术负责人',
          },
          {
              duty:'监督人',
          }
      ];


    return(
        entrustData['测试方案评审表'] === null ? null : (
        <Form
        name="测试方案评审表"
        initialValues={{ remember: true }}
        style={{ padding: mobile()?'20px 5px': '20px 30px' }}
        labelCol={{ span: 10, flex: 'auto' }}
        wrapperCol={{ span: 20 }}
        layout='vertical'
        >
        <Descriptions     
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        layout='vertical'
        title={<h2 style={{ textAlign: 'center',fontWeight: 'bolder', marginTop: 30 }}>测试方案评审表</h2>}
        >
            <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>软件名称</h3>} >
            <h4 style={{ fontWeight: 'bolder'}} >{entrustData['测试方案评审表']['软件名称']}</h4>
            </Descriptions.Item>

            <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本号</h3>} >
            <h4 style={{ fontWeight: 'bolder'}} >{entrustData['测试方案评审表']['版本号']}</h4>
            </Descriptions.Item>

            <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>项目编号</h3>} >
            <h4 style={{ fontWeight: 'bolder'}} >{entrustData['测试方案评审表']['项目编号']}</h4>
            </Descriptions.Item>

            <Descriptions.Item label={<h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>测试类别</h3>} >
            <h4 style={{ fontWeight: 'bolder'}} >{entrustData['测试方案评审表']['测试类别']}</h4>
            </Descriptions.Item>
        </Descriptions>

        <Table dataSource={data} pagination={{pageSize:40}} bordered>
            <Column title='评审内容' dataIndex='content' key='content' width='30%'>
            </Column>

            <ColumnGroup title='评审结论' dataIndex='conclusion' key='conclusion'>
                <Column title='通过' dataIndex='pass' key='pass'
                    render={(_, record,index) => (
                    <Form.Item name={'pass_'+index}>
                        <Switch disabled checkedChildren="是" unCheckedChildren="否" defaultChecked={entrustData['测试方案评审表']['pass_'+index]}/>
                    </Form.Item>
                    )}
                >
                </Column>

                <Column title='不通过及原因' dataIndex='fail' key='fail'
                    render={(_, record,index) => (
                    <Form.Item name={'fail_reason_'+index} initialValue={''}>
                    {entrustData['测试方案评审表']['pass_'+index]===false?(
                        <h5 style={{fontWeight: 'bolder', marginTop: 30}}>{entrustData['测试方案评审表']['fail_reason_'+index]}</h5>
                    ):(
                        <h5 style={{fontWeight: 'bolder', marginTop: 30}}>该方案通过</h5>
                    )}
                    
                    </Form.Item>
                    )}
                >
                </Column>
            </ColumnGroup>
        </Table>
        
        <Table dataSource={data1} columns={columns} pagination={{pageSize:40}} bordered></Table>
        <Descriptions     
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
            <Descriptions.Item label={<h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>最终评审意见</h4>} >
            <h4 style={{ fontWeight: 'bolder', marginTop: 30 }} >{entrustData['测试方案评审表']['确认意见']}</h4>
            </Descriptions.Item>
        </Descriptions>
        </Form>
        )
            
    )




}

export default Viewtsreviewform;
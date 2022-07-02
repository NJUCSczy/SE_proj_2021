import {React, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Descriptions, Collapse, message, DatePicker, Divider, Form, Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import { useEffect, useState } from 'react';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';

var _ = require('lodash');


function Viewquestionlist(props){
  const { UpdateUserInfo, GotoPage, _state, focusedData } = props;
  const [entrustData, setEntrustData] = useState({ 'formData': null, '软件测试问题清单': null })
  const { Option } = Select;
  const { TextArea } = Input;
  const [formValue,setFormValue]=useState(0);
  const { Panel } = Collapse;

  const updateInfo = () => {
    if (USE_JSON_SERVER) {
        fetch("http://localhost:8000/forms/"+ _state['PageInfo']['id'] , {
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
                        
                        newData['软件测试问题清单'] = data['软件测试问题清单']
                        return newData
                    })
                }
            })
    }
    else {
        fetch(REMOTE_SERVER + "/test/" + _state['PageInfo']['id']+"/test-doc/buglist", {
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
                    alert('查询软件测试问题清单失败！')
                    return null
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                if (data != null) {
                    setEntrustData(prev => {
                        const newData = _.cloneDeep(prev)
                        newData["formData"] = data
                        newData['软件测试问题清单'] = data['BugListDto']
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
            newData['软件测试问题清单'] = focusedData
            return newData
        })
    }  
}, []
)

const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: '请正确选择时间',
      },
    ],
  };


return (
    entrustData['软件测试问题清单'] === null ? null : (
        <Form
        name="软件测试问题清单"
        initialValues={{ "项目列表": entrustData['软件测试问题清单']['项目列表'] }}
        //initialValues={{ remember: true }}
        style={{ padding: '20px 30px' }}
        autoComplete="false"
        >
        <h1 style={{ textAlign: 'center', fontSize: 30 }}>软件测试问题清单</h1>

        {entrustData['软件测试问题清单']['项目列表'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >问题（缺陷）简要描述:{index['问题（缺陷）简要描述']}</h4>} key="1">
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="对应需求条目" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['对应需求条目']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="发现缺陷的初始条件" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['发现缺陷的初始条件']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="发现缺陷用例及具体操作路径" span={3}>
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['发现缺陷用例及具体操作路径（要具体）']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="关联用例" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['关联用例']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="发现时间" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['时间']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="责任人" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['责任人']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="修改建议" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['修改建议']}</h4>
                            </Descriptions.Item>
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                        
                    
                </div>
                )}


        </Form>
    )
)



}


export default Viewquestionlist;
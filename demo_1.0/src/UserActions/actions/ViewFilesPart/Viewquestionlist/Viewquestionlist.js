import {React, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Collapse, message, DatePicker, Divider, Form, Space, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
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
        fetch("http://localhost:8000/forms/1" , {
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
                        newData['软件测试问题清单'] = data['软件测试问题清单']
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
                if (res.status != 200) {
                    alert('查询报价单失败！')
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
                        newData['报价单'] = data['offerTableUnion']
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

        <Form.List name="项目列表" layout='vertical' width={500}>
            {(fields, { add, remove }) => (
            <>
                {fields.map(({ key, name, ...restField }) => (
                <Fragment layout='vertical' key={key} style={{ display: 'flex', marginBottom: 8 }}>
                    <Collapse  bordered={false} ghost>
                        <Panel  key="1">
                            <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>问题（缺陷）简要描述</h5>
                            <Form.Item
                            {...restField}
                            name={[name, '问题（缺陷）简要描述']}
                            rules={[{ required: true, message: '请填写问题（缺陷）简要描述' }]}
                            >
                            <Input.TextArea style={{ maxWidth: 500 }} disabled placeholder="问题（缺陷）简要描述" />
                            </Form.Item>

                            <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>对应需求条目</h5>
                            <Form.Item
                            {...restField}
                            name={[name, '对应需求条目']}
                            rules={[{ required: true, message: '请填写对应需求条目' }]}
                            >
                            <Input style={{ maxWidth: 500 }} disabled placeholder="对应需求条目" />
                            </Form.Item>

                            <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>发现缺陷的初始条件</h5>
                            <Form.Item
                            {...restField}
                            name={[name, '发现缺陷的初始条件']}
                            rules={[{ required: true, message: '请填写发现缺陷的初始条件' }]}
                            >
                            <Input.TextArea style={{ maxWidth: 500 }} disabled placeholder="发现缺陷的初始条件" />
                            </Form.Item>

                            <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>发现缺陷用例及具体操作路径（要具体）</h5>
                            <Form.Item
                            {...restField}
                            name={[name, '发现缺陷用例及具体操作路径（要具体）']}
                            rules={[{ required: true, message: '请填写发现缺陷用例及具体操作路径' }]}
                            >
                            <Input.TextArea style={{ maxWidth: 500 }} disabled placeholder="发现缺陷用例及具体操作路径（要具体）" />
                            </Form.Item>

                            <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>关联用例</h5>
                            <Form.Item
                            {...restField}
                            name={[name, '关联用例']}
                            rules={[{ required: true, message: '请填写关联用例' }]}
                            >
                            <Input style={{ maxWidth: 500 }} disabled placeholder="关联用例" />
                            </Form.Item>

                            <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>发现时间</h5>
                            <Form.Item name={[name, '时间']} label="DatePicker" {...config}>
                            <Input style={{ maxWidth: 500 } } disabled/>
                            </Form.Item>

                            <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>责任人</h5>
                            <Form.Item
                            {...restField}
                            name={[name, '责任人']}
                            rules={[{ required: true, message: '请填写责任人' }]}
                            >
                            <Input style={{ maxWidth: 500 } } disabled placeholder="责任人" />
                            </Form.Item>

                            <h5 style={{ fontWeight: 'bolder', marginTop: 30 }}>修改建议</h5>
                            <Form.Item
                            {...restField}
                            name={[name, '修改建议']}
                            rules={[{ required: true, message: '请填写修改建议' }]}
                            >
                            <Input.TextArea style={{ maxWidth: 500 }} disabled placeholder="修改建议" />
                            </Form.Item>
                        </Panel>
                    </Collapse>
                                        
                    
                </Fragment>
                ))}
            </>
            )}
        </Form.List>

        </Form>
    )
)



}


export default Viewquestionlist;
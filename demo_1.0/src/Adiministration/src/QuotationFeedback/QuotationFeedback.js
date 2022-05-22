import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { message, Typography, DatePicker, Form, InputNumber, Button, Input, Col, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { useEffect, useState } from 'react';
import moment from 'moment';
import ViewQuotation from '../ViewQuotation/ViewQuotation';
import { USE_JSON_SERVER } from '../../functions/functions';
const { Title, Paragraph, Text, Link } = Typography;
var _ = require('lodash');

function QuotationFeedback(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
    const userState = props._state
    const [entrustData, setEntrustData] = useState({ 'formData': null })

    const setDataByKey = (key, val) => {
        setEntrustData(prev => {
            const newFormData = _.cloneDeep(prev)
            newFormData[key] = val;
            console.log(newFormData)
            return newFormData;
        })

    }

    const updateInfo = () => {
        if (!USE_JSON_SERVER) return;
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
                if (data != null) {
                    setEntrustData(prev => {
                        const newData = _.cloneDeep(prev)
                        newData["formData"] = data
                        return newData
                    })
                }
                console.log(data)
            })
    }
    useEffect(() => {
        updateInfo();
    }, []
    )

    const SubmitForm = (_form) => {
        if (USE_JSON_SERVER) {
            fetch("http://localhost:8000/forms/" + _state['PageInfo']['id'], {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(_form)
            })
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        message.success({ content: "提交成功！", key: "upload" })
                        GotoPage("ViewEntrust", _state)
                    }
                    else {
                        message.error({ content: "提交失败！", key: "upload" })
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                })
        }
        else {
            fetch("http://42.192.56.231:8000/offer/reply/delegation/" + _state['PageInfo']['id'], {
                method: "POST",
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
                body: JSON.stringify(_form)
            })
                .then(res => {
                    console.log(res)
                    if (res.status === 201|| res.status === 200) {
                        message.success({ content: "提交成功！", key: "upload" })
                        GotoPage("ViewEntrust", _state)
                    }
                    else {
                        message.error({ content: "提交失败！", key: "upload" })
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                })
        }
    }

    const onFinishForm = (values) => {
        if (USE_JSON_SERVER) {
            var form = entrustData['formData'];
            form['报价单']['用户反馈'] = values['用户反馈']
            form['市场部审核委托']['委托人签字'] = values['委托人签字']
            form['市场部审核委托']['委托人签字日期'] = values['委托人签字日期']
            SubmitForm(form)
        }
        else {
            var form = {};
            form['态度'] = values['用户反馈']
            if (values['附加信息'] != undefined)
                form['附加信息'] = values['附加信息']
            if (values['委托人签字'] != undefined) {
                form['确认信息'] = {}
                form['确认信息']['委托人签字'] = values['委托人签字']
                form['确认信息']['日期'] = values['委托人签字日期']
            }
            console.log(form)
            SubmitForm(form)
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        alert('请正确填写！')
    };

    return (
        <div>
            <ViewQuotation _state={_state} UpdateUserInfo={UpdateUserInfo} GotoPage={GotoPage}></ViewQuotation>
            <Form
                initialValues={{ remember: true }}
                style={{ padding: '20px 30px' }}
                autoComplete="false"
                onFinish={onFinishForm}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="用户反馈"
                    rules={[{ required: true, message: '请选择是否接受报价' }]}
                >
                    <Radio.Group >
                        <Col span={30} >
                            <Radio value="接受" style={{ lineHeight: '32px' }} onClick={() => setDataByKey('用户反馈', '接受')}>接受</Radio>
                        </Col>
                        <Col span={30}>
                            <Radio value="请求议价" style={{ lineHeight: '32px' }} onClick={() => setDataByKey('用户反馈', '请求议价')}>请求议价</Radio>
                        </Col>
                        <Col span={30}>
                            <Radio value="不接受" style={{ lineHeight: '32px' }} onClick={() => setDataByKey('用户反馈', '不接受')}>不接受</Radio>
                        </Col>
                    </Radio.Group>
                </Form.Item>
                {(entrustData['用户反馈'] === '接受') ? (
                    <div>
                        <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>委托人签字</h4>
                        <Form.Item
                            name="委托人签字"
                            rules={[{ required: true, message: '请填写委托人签字' }]}
                        ><Input style={{ maxWidth: 300 }} /></Form.Item>
                        <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>日期</h4>
                        <Form.Item
                            name="委托人签字日期"
                            rules={[{ required: true, message: '请填写日期' }]}
                        ><DatePicker /></Form.Item>
                    </div>
                ) : null
                }
                {(entrustData['用户反馈'] != '接受' && entrustData['用户反馈'] != undefined) ? (
                    <div>
                        <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>理由</h4>
                        <Form.Item
                            name="附加信息"
                        ><TextArea rows={3} style={{ maxWidth: 700 }} /></Form.Item>
                    </div>
                ) : null
                }
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}


export default QuotationFeedback
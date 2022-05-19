import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { Typography, DatePicker, Form, InputNumber, Button, Input, Col, Radio } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { useEffect, useState } from 'react';
import moment from 'moment';
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
                    alert("提交成功！")
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
            })
    }

    const onFinishForm = (values) => {
        var form = entrustData['formData'];
        form['报价单']['用户反馈'] = values['用户反馈']
        form['市场部审核委托']['委托人签字'] = values['委托人签字']
        form['市场部审核委托']['委托人签字日期'] = values['委托人签字日期']
        SubmitForm(form)
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        alert('请正确填写！')
    };

    return (
        <div><h2>这里是报价表</h2>
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
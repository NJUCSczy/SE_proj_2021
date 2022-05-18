import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { Typography, DatePicker, Form, InputNumber, Button, Input } from 'antd';
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
        form['报价单']['用户反馈'] = values
        SubmitForm(form)
    }


    console.log(entrustData)
    return (
        <div><h2>这里是报价表</h2>
            <Form inline style={{ textAlign: 'center' }}>
                <Button onClick={() => onFinishForm('接受')}>确认合同</Button>&emsp;
                <Button onClick={() => onFinishForm('再议价')}>申请再议</Button>&emsp;
                <Button onClick={() => onFinishForm('不接受')}>结束委托</Button>
            </Form>
        </div>
    )
}


export default QuotationFeedback
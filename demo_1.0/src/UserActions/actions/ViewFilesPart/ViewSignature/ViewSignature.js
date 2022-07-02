import React, { Component } from 'react'
import { DatePicker, Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './ViewSignature.css'
import { getStageByInfo, getStatusInfo, REMOTE_SERVER, USE_JSON_SERVER } from '../../../functions/functions';
import { useEffect, useState } from 'react';
import moment from 'moment';

var _ = require('lodash');

function ViewSignature(props) {
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
                            newData['委托人签章'] = data['测试合同']['签章']['委托人签章']
                            newData['市场部签章'] = data['测试合同']['签章']['市场部签章']
                            return newData
                        })
                    }
                })
        }
        else {
            fetch(REMOTE_SERVER + "/contract/" + _state['PageInfo']['ContractID'], {
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
                        alert('获取合同签章失败！')
                        return null
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    if (data != null) {
                        setEntrustData(prev => {
                            const newData = _.cloneDeep(prev)
                            newData['委托人签章'] = data['contractTable']['软件委托测试合同(委托方部分)']
                            newData['市场部签章'] = data['contractTable']['软件委托测试合同(受托方部分)']
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
        entrustData['委托人签章'] === null ? null : (
            <Form
                name="软件测试委托合同签章">

                <h1 style={{ textAlign: 'center', fontSize: 30 }}>软件测试委托合同签章</h1>

                <h2 style={{ fontWeight: 'bolder', fontSize: 30, marginTop: 40 }}>软件测试委托合同签章(委托方)</h2>

                {getStageByInfo(entrustData['formData']) < 19 ? null : (
                    <div>
                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>单位全称</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['委托人签章']['单位全称']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>授权代表</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['委托人签章']['授权代表']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>签章时间</h3>
                        <DatePicker disabled defaultValue={moment((entrustData['委托人签章']['签章时间']), 'YYYY/MM/DD')} format='YYYY/MM/DD' />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>联系人</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['委托人签章']['联系人']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>通讯地址</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['委托人签章']['通讯地址']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>电话</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['委托人签章']['电话']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>传真</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['委托人签章']['传真']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>开户银行</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['委托人签章']['开户银行']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>账号</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['委托人签章']['账号']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>邮编</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['委托人签章']['邮编']} />
                    </div>
                )}

                <h2 style={{ fontWeight: 'bolder', fontSize: 30, marginTop: 40 }}>软件测试委托合同签章(受托方)</h2>
                {getStageByInfo(entrustData['formData']) < 18 ? null : (
                    <div>
                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>单位全称</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={'南京大学计算机软件新技术国家重点实验室'} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>授权代表</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['市场部签章']['授权代表']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>签章时间</h3>
                        <DatePicker disabled defaultValue={moment((entrustData['市场部签章']['签章时间']), 'YYYY/MM/DD')} format='YYYY/MM/DD' />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>联系人</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['市场部签章']['联系人']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>通讯地址</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['市场部签章']['通讯地址']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>电话</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['市场部签章']['电话']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>传真</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['市场部签章']['传真']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>开户银行</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['市场部签章']['开户银行']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>户名</h3>
                        <Input style={{ maxWidth: 500 }} disabled defaultValue={entrustData['市场部签章']['户名']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>账号</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['市场部签章']['账号']} />

                        <h3 style={{ fontWeight: 'bolder', marginTop: 30 }}>邮编</h3>
                        <Input style={{ maxWidth: 500 }} disabled={true} defaultValue={entrustData['市场部签章']['邮编']} />
                    </div>
                )}


            </Form>
        )
    )




}



export default ViewSignature
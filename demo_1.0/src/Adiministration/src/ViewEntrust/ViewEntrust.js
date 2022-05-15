import './ViewEntrust.css'
import React from 'react';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

var _ = require('lodash');

function ViewEntrust(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
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

    const ViewApplication = () => {
        UpdateUserInfo({ PageInfo: { 'id': _state['PageInfo']['id'] } }, GotoPage('ViewApplication', _state))
    }

    const MktdptApplication = () => {
        UpdateUserInfo({ PageInfo: { 'id': _state['PageInfo']['id'] } }, GotoPage('MktdptApplication', _state))
    }

    return (
        <div style={{ padding: 30 }}>
            <h1>用户名称: {(entrustData['formData'] === null) ? null : entrustData['formData']['userName']}</h1>
            <h1 style={{ marginTop: 40 }}>测试申请表</h1>
            <h2 style={{ marginLeft: 20 }}>状态:{' '}
                {(entrustData['formData'] === null) ? null :
                    entrustData['formData'].hasOwnProperty('userApplication') === false ? "错误" :
                        "用户已提交申请，等待审核"
                }
            </h2>
            <Button
                type="primary"
                style={{ marginLeft: 20 }}
                onClick={ViewApplication}
            >查看</Button>

            <Button
                type="primary"
                style={{ marginLeft: 20 }}
            >测试部人员审核</Button>
            <Button
                type="primary"
                style={{ marginLeft: 20 }}
                onClick={MktdptApplication}
            >市场部人员审核</Button>
        <h1 style={{ marginTop: 40 }}>测试合同</h1>
        <h2 style={{ marginLeft: 20 }}>状态:{' '}
            {(entrustData['formData'] === null) ? null :
                entrustData['formData'].hasOwnProperty('测试合同') === false ? "等待市场部填写" :
                entrustData['formData']['测试合同']['议价情况'] === null ? "等待客户接受议价" :
                entrustData['formData']['测试合同']['议价情况']['接受情况'] === '不接受' ? '用户不接受议价，委托中止' :
                entrustData['formData']['测试合同']['议价情况']['接受情况'] === '再议价' ? '用户申请再议价' :
                entrustData['formData']['测试合同'].hasOwnProperty('签章') === false ? '等待市场部填写受托人签章' :
                entrustData['formData']['测试合同']['签章'].hasOwnProperty('委托人签章') ? '已正式生成测试合同' : '等待客户填写委托人签章'
            }
        </h2>
        <Button
            type="primary"
            style={{ marginLeft: 20 }}
        >查看</Button>

        <Button
            type="primary"
            style={{ marginLeft: 20 }}
        >市场部填写测试合同</Button>
        <Button
            type="primary"
            style={{ marginLeft: 20 }}
        >用户查看议价</Button>
        <Button
            type="primary"
            style={{ marginLeft: 20 }}
        >市场部查看再议价</Button>
        <Button
            type="primary"
            style={{ marginLeft: 20 }}
        >市场部完善测试合同，填写受托人签章</Button>
        <Button
            type="primary"
            style={{ marginLeft: 20 }}
        >用户填写委托人签章</Button>
    </div>
    )
}
export default ViewEntrust
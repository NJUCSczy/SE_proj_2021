import './ViewEntrust.css'
import React from 'react';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

var _ = require('lodash');

function ViewEntrust(props) {
    const { UpdateUserInfo, GotoPage,_state } = props;
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

    const ViewApplication =() => {
        UpdateUserInfo({PageInfo:{'id':_state['PageInfo']['id']}},GotoPage('ViewApplication',_state))
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
            >编辑</Button>
        </div>
    )
}
export default ViewEntrust
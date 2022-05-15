import './ViewEntrust.css'
import React from 'react';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { getStageByInfo, getStatusInfo } from '../../functions/functions'

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
    const TadultApplication = () => {
        UpdateUserInfo({ PageInfo: { 'id': _state['PageInfo']['id'] } }, GotoPage('TadultApplication', _state))
    }
    const TrusteeApplication = () => {
        UpdateUserInfo({ PageInfo: { 'id': _state['PageInfo']['id'] } }, GotoPage('TrusteeApplication', _state))
    }
    const ClientApplication = () => {
        UpdateUserInfo({ PageInfo: { 'id': _state['PageInfo']['id'] } }, GotoPage('ClientApplication', _state))
    }
    const ConfidentialAgreementPartyB = () => {
        UpdateUserInfo({ PageInfo: { 'id': _state['PageInfo']['id'] } }, GotoPage('ConfidentialAgreementPartyB', _state))
    }
    const ConfidentialAgreementPartyA = () => {
        UpdateUserInfo({ PageInfo: { 'id': _state['PageInfo']['id'] } }, GotoPage('ConfidentialAgreementPartyA', _state))
    }

    return (
        <div style={{ padding: 30 }}>
            <h1>用户名称: {(entrustData['formData'] === null) ? null : entrustData['formData']['userName']}</h1>
            <h1 style={{ marginTop: 40 }}>软件项目委托测试申请书</h1>
            <h2 style={{ marginLeft: 20 }}>状态:{' '}
                {getStatusInfo(entrustData['formData'], '软件项目委托测试申请书')
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
                onClick={TadultApplication}
            >测试部人员审核</Button>
            <Button
                type="primary"
                style={{ marginLeft: 20 }}
                onClick={MktdptApplication}
            >市场部人员审核</Button>
            <h1 style={{ marginTop: 40 }}>软件委托测试合同</h1>
            <h2 style={{ marginLeft: 20 }}>状态:{' '}
                {getStatusInfo(entrustData['formData'], '软件委托测试合同')
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
                onClick={TrusteeApplication}
            >市场部完善测试合同，填写受托人签章</Button>
            <Button
                type="primary"
                style={{ marginLeft: 20 }}
                onClick={ClientApplication}
            >用户填写委托人签章</Button>

            <h1 style={{ marginTop: 40 }}>软件项目委托测试保密协议</h1>
            <h2 style={{ marginLeft: 20 }}>状态:{' '}
                {getStatusInfo(entrustData['formData'], '软件项目委托测试保密协议')
                }
            </h2>
            <Button
                type="primary"
                style={{ marginLeft: 20 }}
            >查看</Button>
            <Button
                type="primary"
                style={{ marginLeft: 20 }}
                onClick={ConfidentialAgreementPartyB}
            >市场部填写</Button>
            <Button
                type="primary"
                style={{ marginLeft: 20 }}
                onClick={ConfidentialAgreementPartyA}
            >用户填写</Button>
        </div>
    )
}
export default ViewEntrust
import './ViewEntrust.css'
import React from 'react';
import { Button, Dropdown, Steps, Space, Collapse, } from 'antd';

import { DownOutlined, SmileOutlined, CaretRightOutlined } from '@ant-design/icons';
import { getStageByInfo, getStatusInfo } from '../../functions/functions'
import { useEffect, useState } from 'react';
var _ = require('lodash');

const { Panel } = Collapse;
const { Step } = Steps;

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

    const TestAgreement = () => {
        UpdateUserInfo({ PageInfo: { 'id': _state['PageInfo']['id'] } }, GotoPage('TestAgreement', _state))
    }
    const CheckTA = () => {
        UpdateUserInfo({ PageInfo: { 'id': _state['PageInfo']['id'] } }, GotoPage('CheckTA', _state))
    }

    return (
        <div style={{ padding: 30 }}>
            <h1>用户名称: {(entrustData['formData'] === null) ? null : entrustData['formData']['userName']}</h1>
            <h1 style={{ marginTop: 40 }}>软件项目委托测试申请书</h1>
            <h2 style={{ marginLeft: 20 }}>状态:{' '}
                {getStatusInfo(entrustData['formData'], '软件项目委托测试申请书')
                }
            </h2>
            <Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 12 }} rotate={isActive ? 90 : 0} />}>
                <Panel header={<h2>详细信息</h2>} key="1">
                    <p>
                        <Steps direction="vertical">
                            <Step title="用户提交申请表"
                                description={getStageByInfo(entrustData['formData']) < 0 ? "状态有误" : "已完成"} status={getStageByInfo(entrustData['formData']) < 0 ? "error" : "finish"} />
                            <Step title="测试部审核"
                                description={getStageByInfo(entrustData['formData']) < 2 ? "审核中" :
                                    getStageByInfo(entrustData['formData']) === 2 ? "驳回申请，理由：" + entrustData['formData']['测试部审核委托']['确认意见'] : "审核通过"}
                                status={getStageByInfo(entrustData['formData']) < 2 ? "process" :
                                    getStageByInfo(entrustData['formData']) === 2 ? "error" : "finish"} />
                            <Step title="市场部审核"
                                description={getStageByInfo(entrustData['formData']) < 3 ? null :
                                    getStageByInfo(entrustData['formData']) === 3 ? "审核中" :
                                        getStageByInfo(entrustData['formData']) === 4 ? "驳回申请" :
                                            getStageByInfo(entrustData['formData']) === 5 ? "需进一步审理" : "审核通过"
                                }
                                status={getStageByInfo(entrustData['formData']) < 3 ? 'wait' :
                                    getStageByInfo(entrustData['formData']) === 3 ? 'process' :
                                        getStageByInfo(entrustData['formData']) === 4 ? 'error' :
                                            getStageByInfo(entrustData['formData']) === 5 ? 'wait' : 'finish'
                                }
                            />
                        </Steps>
                    </p>
                </Panel>
            </Collapse>
            <Button
                type="primary"
                style={{ marginLeft: 20 }}
                onClick={ViewApplication}
            >查看</Button>
            {getStageByInfo(entrustData['formData']) === 1 ? (<Button
                type="primary"
                style={{ marginLeft: 20 }}
                onClick={TadultApplication}
            >测试部人员审核</Button>) : null}
            {(getStageByInfo(entrustData['formData']) === 3 || getStageByInfo(entrustData['formData']) === 5) ? (<Button
                type="primary"
                style={{ marginLeft: 20 }}
                onClick={MktdptApplication}
            >市场部人员审核</Button>) : null}
            <h1 style={{ marginTop: 40 }}>软件委托测试合同</h1>
            <h2 style={{ marginLeft: 20 }}>状态:{' '}
                {getStatusInfo(entrustData['formData'], '软件委托测试合同')
                }
            </h2>
            <Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 12 }} rotate={isActive ? 90 : 0} />}>
                <Panel header={<h2>详细信息</h2>} key="1">
                    <p>
                        <Steps direction="vertical">
                            <Step title="市场部提出议价"
                                description={getStageByInfo(entrustData['formData']) < 6 ? null :
                                    getStageByInfo(entrustData['formData']) === 6 ? "等待市场部提出议价" : "已完成"}
                                status={getStageByInfo(entrustData['formData']) < 6 ? 'wait' :
                                    getStageByInfo(entrustData['formData']) === 6 ? 'process' : 'finish'} />
                            <Step title="用户确认接受议价"
                                description={getStageByInfo(entrustData['formData']) >= 11 ? "已完成" :
                                    getStageByInfo(entrustData['formData']) === 8 ? "等待客户确认议价" :
                                        getStageByInfo(entrustData['formData']) === 9 ? "客户不接受议价" : null}
                                status={getStageByInfo(entrustData['formData']) >= 11 ? 'finish' :
                                    getStageByInfo(entrustData['formData']) === 8 ? 'process' :
                                        getStageByInfo(entrustData['formData']) === 9 ? 'error' : 'wait'} />
                            <Step title="市场部填写受托人签章"
                                description={getStageByInfo(entrustData['formData']) < 11 ? null :
                                    getStageByInfo(entrustData['formData']) === 11 ? "进行中" : "已完成"
                                }
                                status={getStageByInfo(entrustData['formData']) < 11 ? 'wait' :
                                    getStageByInfo(entrustData['formData']) === 11 ? 'process' : 'finish'
                                }
                            />
                            <Step title="客户填写委托人签章"
                                description={getStageByInfo(entrustData['formData']) < 12 ? null :
                                    getStageByInfo(entrustData['formData']) === 12 ? "进行中" : "已完成"
                                }
                                status={getStageByInfo(entrustData['formData']) < 12 ? 'wait' :
                                    getStageByInfo(entrustData['formData']) === 12 ? 'process' : 'finish'
                                }
                            />
                        </Steps>
                    </p>
                </Panel>
            </Collapse>
            <Button
                type="primary"
                style={{ marginLeft: 20 }}
            >查看</Button>
            {(getStageByInfo(entrustData['formData']) === 7 || getStageByInfo(entrustData['formData']) === 10) ? (
                <Button
                    type="primary"
                    style={{ marginLeft: 20 }}
                    onClick={TestAgreement}
                >市场部发起议价</Button>) : null}
            {(getStageByInfo(entrustData['formData']) === 8) ? (
                <Button
                    type="primary"
                    style={{ marginLeft: 20 }}
                    onClick={CheckTA}
                >用户查看议价</Button>) : null}
            {(getStageByInfo(entrustData['formData']) === 9) ? (
                <Button
                    type="primary"
                    style={{ marginLeft: 20 }}
                    onClick={TrusteeApplication}
                >市场部填写受托人签章</Button>) : null}
            {(getStageByInfo(entrustData['formData']) === 10) ? (
                <Button
                    type="primary"
                    style={{ marginLeft: 20 }}
                    onClick={ClientApplication}
                >用户填写委托人签章</Button>) : null}

            <h1 style={{ marginTop: 40 }}>软件项目委托测试保密协议</h1>
            <h2 style={{ marginLeft: 20 }}>状态:{' '}
                {getStatusInfo(entrustData['formData'], '软件项目委托测试保密协议')
                }
            </h2>
            <Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 12 }} rotate={isActive ? 90 : 0} />}>
                <Panel header={<h2>详细信息</h2>} key="1">
                    <p>
                        <Steps direction="vertical">
                            <Step title="测试部填写保密协议"
                                description={getStageByInfo(entrustData['formData']) < 13 ? null :
                                    getStageByInfo(entrustData['formData']) === 13 ? "等待测试部填写保密协议" : "已完成"}
                                status={getStageByInfo(entrustData['formData']) < 13 ? 'wait' :
                                    getStageByInfo(entrustData['formData']) === 13 ? 'process' : 'finish'} />
                            <Step title="客户填写保密协议"
                                description={getStageByInfo(entrustData['formData']) < 14 ? null :
                                    getStageByInfo(entrustData['formData']) === 14 ? "等待客户填写保密协议" : "已完成"}
                                status={getStageByInfo(entrustData['formData']) < 14 ? 'wait' :
                                    getStageByInfo(entrustData['formData']) === 14 ? 'process' : 'finish'} />
                        </Steps>
                    </p>
                </Panel>
            </Collapse>
            <Button
                type="primary"
                style={{ marginLeft: 20 }}
            >查看</Button>
            {(getStageByInfo(entrustData['formData']) === 13) ? (
                <Button
                    type="primary"
                    style={{ marginLeft: 20 }}
                    onClick={ConfidentialAgreementPartyB}
                >市场部填写</Button>) : null}
            {(getStageByInfo(entrustData['formData']) === 14) ? (
                <Button
                    type="primary"
                    style={{ marginLeft: 20 }}
                    onClick={ConfidentialAgreementPartyA}
                >用户填写</Button>) : null}
        </div>
    )
}
export default ViewEntrust
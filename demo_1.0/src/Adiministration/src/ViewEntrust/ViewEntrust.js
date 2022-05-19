import './ViewEntrust.css'
import React from 'react';
import { Button, Dropdown, Steps, Space, Collapse, } from 'antd';

import { DownOutlined, SmileOutlined, CaretRightOutlined } from '@ant-design/icons';
import { getStageByInfo, getStatusInfo } from '../../functions/functions'
import { useEffect, useState } from 'react';
import { USE_JSON_SERVER } from '../../functions/functions';
var _ = require('lodash');

const { Panel } = Collapse;
const { Step } = Steps;

function ViewEntrust(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [entrustData, setEntrustData] = useState({ 'formData': null,'stage':-1 })
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
                        newData['stage']=getStageByInfo(data);
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

    const ChangePage = (pageName) => {
        UpdateUserInfo({ PageInfo: { 'id': _state['PageInfo']['id'] } }, GotoPage(pageName, _state))
    }

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
            <h1 style={{ marginLeft: 20 }}>当前状态:{' '}{getStatusInfo(entrustData['formData'])}</h1>
            <Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 12 }} rotate={isActive ? 90 : 0} />}>
                <Panel header={<h2>详细信息</h2>} key="1">
                    <p>
                        <Steps direction="vertical">
                            <Step title='用户提交申请表'
                                description={entrustData['stage'] < 0 ? '状态有误' : '已完成'}
                                status={entrustData['stage'] < 0 ? 'error' : 'finish'} />
                            <Step title='用户提交软件功能列表'
                                description={entrustData['stage'] < 1 ? '等待用户提交' : '已完成'}
                                status={entrustData['stage'] < 1 ? 'wait' : 'finish'} />
                            <Step title='用户提交相关文件'
                                description={entrustData['stage'] < 2 ? '等待用户提交' : '已完成'}
                                status={entrustData['stage'] < 2 ? 'wait' : 'finish'} />
                            <Step title='测试部审核'
                                description={entrustData['stage'] < 2 ? null :
                                    entrustData['stage'] === 2 ? '审核中' : 
                                    entrustData['stage'] === 3 ? '驳回' :'通过'}
                                status={entrustData['stage'] < 2 ? 'wait' :
                                    entrustData['stage'] === 2 ? 'process' : 
                                    entrustData['stage'] === 3 ? 'error' :'finish'} />
                            <Step title='测试部审核'
                                description={entrustData['stage'] < 4 ? null :
                                    entrustData['stage'] === 4 ? '审核中' : 
                                    entrustData['stage'] === 5 ? '不受理' :
                                    entrustData['stage'] === 6 ? '需进一步审理' :'通过'}
                                status={entrustData['stage'] < 4 ? 'wait' :
                                    entrustData['stage'] === 4 ? 'process' : 
                                    entrustData['stage'] === 5 ? 'error' :
                                    entrustData['stage'] === 6 ? 'process' :'finish'} />
                            <Step title='议价'
                                description={entrustData['stage'] < 7 ? null :
                                    entrustData['stage'] === 7 ? '等待市场部发起议价' : 
                                    entrustData['stage'] === 8 ? '市场部已发起议价，等待用户回复' :
                                    entrustData['stage'] === 9 ? '用户不接受议价，委托结束' :
                                    entrustData['stage'] === 10 ? '用户申请再议价' :'用户已接受议价'}
                                status={entrustData['stage'] < 7 ? 'wait' :
                                    entrustData['stage'] === 9 ? 'error' :
                                    entrustData['stage'] >= 11 ? 'finish' :'process'} />
                            <Step title='完成测试申请书'
                                description={entrustData['stage'] < 11 ? null :
                                    entrustData['stage'] === 11 ? '等待市场部完成测试申请书' : '已完成'}
                                status={entrustData['stage'] < 11 ? 'wait' :
                                    entrustData['stage'] === 11 ? 'process' : 'finish'} />
                            <Step title='确定履行期限'
                                description={entrustData['stage'] < 12 ? null :
                                    entrustData['stage'] === 12 ? '等待市场部拟写测试合同，并提出履行期限' : 
                                    entrustData['stage'] === 13 ? '市场部已提出履行期限，等待客户回复' :
                                    entrustData['stage'] === 14 ? '客户不接受履行期限，委托中止' :
                                    entrustData['stage'] === 15 ? '客户针对履行期限申请再议' :'客户已接受'}
                                status={entrustData['stage'] < 12 ? 'wait' :
                                    entrustData['stage'] === 14 ? 'error' :
                                    entrustData['stage'] >= 16 ? 'finish' :'process'} />
                            <Step title='完成测试合同'
                                description={entrustData['stage'] < 16 ? null :
                                    entrustData['stage'] === 16 ? '等待市场部填写测试合同受托人签章' : 
                                    entrustData['stage'] === 17 ? '等待客户填写测试合同委托人签章' : '已完成'}
                                status={entrustData['stage'] < 16 ? 'wait' :
                                    entrustData['stage'] >= 18 ? 'finish' : 'process'} />
                            <Step title='签署保密协议'
                                description={entrustData['stage'] < 18 ? null :
                                    entrustData['stage'] === 18 ? '等待市场部起草保密协议' : 
                                    entrustData['stage'] === 19 ? '等待用户签署保密协议' : '已完成'}
                                status={entrustData['stage'] < 18 ? 'wait' :
                                    entrustData['stage'] >= 20 ? 'finish' : 'process'} />
                            <Step title='委托完成'
                                status={entrustData['stage'] >= 20 ? 'finish' : 'wait'} />
                        </Steps>
                    </p>
                </Panel>
            </Collapse>
            {(() => {
                switch(entrustData['stage']){
                    case 0:return (<Button type="primary" style={{ marginLeft: 20 }}
                        onClick={() => ChangePage('FunctionList')}>用户填写软件功能列表</Button>);
                    case 1:return (null);
                    case 2:return (<Button type="primary" style={{ marginLeft: 20 }}
                        onClick={() => ChangePage('TadultApplication')}>测试部人员审核</Button>);
                    case 3:case 5:case 9:case 14:return null;
                    case 4:case 6:return (<Button type="primary" style={{ marginLeft: 20 }}
                        onClick={() => ChangePage('MktdptApplicationStep1')}>市场部人员审核</Button>);
                    case 7:case 10:return (<Button type="primary" style={{ marginLeft: 20 }}
                        onClick={() => ChangePage('Quotation')}>发起议价</Button>);
                    case 8:return (<Button type="primary" style={{ marginLeft: 20 }}
                        onClick={() => ChangePage('QuotationFeedback')}>查看议价</Button>);
                    case 11:return (<Button type="primary" style={{ marginLeft: 20 }}
                        onClick={() => ChangePage('MktdptApplicationStep2')}>市场部完成申请表</Button>);
                    case 12:case 15:return (<Button type="primary" style={{ marginLeft: 20 }}
                        onClick={() => ChangePage('TestAgreement')}>市场部起草测试合同，拟定履行期限</Button>);
                    case 13:return (<Button type="primary" style={{ marginLeft: 20 }}
                        onClick={() => ChangePage('CheckTA')}>查看履行日期</Button>);
                    case 16:return (<Button type="primary" style={{ marginLeft: 20 }}
                        onClick={() => ChangePage('TrusteeApplication')}>市场部填写签章</Button>);
                    case 17:return (<Button type="primary" style={{ marginLeft: 20 }}
                        onClick={() => ChangePage('ClientApplication')}>客户填写签章</Button>);
                    case 18:return (<Button type="primary" style={{ marginLeft: 20 }}
                        onClick={() => ChangePage('ConfidentialAgreementPartyB')}>市场部填写保密协议</Button>);
                    case 19:return (<Button type="primary" style={{ marginLeft: 20 }}
                        onClick={() => ChangePage('ConfidentialAgreementPartyA')}>客户填写保密协议</Button>);
                }
            })()}
            <h1 style={{marginTop:60}}>文件列表</h1>
                (<div>
                    <h2 style={{ marginTop: 40 }}>软件项目委托测试申请书</h2>
                    <h2 style={{ marginTop: 40 }}>状态:{" "+getStatusInfo(entrustData['formData'],'软件项目委托测试申请书')}</h2>
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={() => ChangePage('ViewApplication')}>查看</Button>
                </div>):null
            {(entrustData['stage']>=18)?
                (<div>
                    <h2 style={{ marginTop: 40 }}>软件测试委托合同签章</h2>
                    <h2 style={{ marginTop: 40 }}>状态:{" "+getStatusInfo(entrustData['formData'],'软件委托测试合同')}</h2>
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={() => ChangePage('ViewSignature')}>查看</Button>
                </div>):null
            }
            {(entrustData['stage']>=20)?
                (<div>
                    <h2 style={{ marginTop: 40 }}>保密协议</h2>
                    <h2 style={{ marginTop: 40 }}>状态:{" "+getStatusInfo(entrustData['formData'],'保密协议')}</h2>
                    <Button type="primary" style={{ marginLeft: 20 }} onClick={() => ChangePage('ViewCfdtagreement')}>查看</Button>
                </div>):null
            }
        </div>
    )
}
export default ViewEntrust
import './ViewProject.css'
import React from 'react';
import { Descriptions, Select, Button, Dropdown, Steps, Space, Collapse, Row, Col, } from 'antd';

import { DownOutlined, SmileOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { USE_JSON_SERVER, REMOTE_SERVER} from '../../../functions/functions';
import {  getTestStageByInfo, getTestStageByDTAState, getTestStatusInfo, getStatusByDelegationState } from '../../../functions/functionTest';
var _ = require('lodash');

const { Panel } = Collapse;
const { Step } = Steps;

function ViewProject(props){
    const { Option } = Select;
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [fileData, setfileData] = useState({})
    const [entrustData, setEntrustData] = useState({ 'formData': null, 'stage': -1 })



    const updateInfo = () => {
        if (USE_JSON_SERVER) {
            fetch("http://localhost:8000/forms/3"/* + _state['PageInfo']['id']*/, {
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
                            newData['stage'] = getTestStageByInfo(data);
                            return newData
                        })
                    }
                    console.log(data)
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
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    if (data != null) {
                        setEntrustData(prev => {
                            const newData = _.cloneDeep(prev)
                            newData["formData"] = data
                            newData['stage'] = getStatusByDelegationState(data['state']);
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

    const ChangePage = (pageName) => {
        UpdateUserInfo({ PageInfo: { 'id': _state['PageInfo']['id'] } }, GotoPage(pageName, _state))
    }

    return (
        (entrustData['formData'] === null) ? null :
            (<div style={{ padding: 30 }}>
                <Descriptions bordered title="项目基本信息" layout="vertical" style={{ marginLeft: 20 , marginRight: 20}}>
                    <Descriptions.Item label="项目编号">{(entrustData['formData'] === null) ? null : USE_JSON_SERVER ? entrustData['formData']['市场部审核委托']['测试项目编号'] : entrustData['formData']['delegationId']}</Descriptions.Item>
                    <Descriptions.Item label="用户">{(entrustData['formData'] === null) ? null : USE_JSON_SERVER ? entrustData['formData']['userName'] : entrustData['formData']['usrBelonged']}</Descriptions.Item>
                    <Descriptions.Item label="当前状态">{USE_JSON_SERVER ? getTestStatusInfo(entrustData['formData']) : getStatusByDelegationState(entrustData['formData']['state'])}</Descriptions.Item>
                </Descriptions>
                <Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 12 }} rotate={isActive ? 90 : 0} />}>
                    <Panel header={<h3>详细信息</h3>} key="1">
                        <p>
                            <Steps direction="vertical">
                                <Step title='项目成立'
                                    description={entrustData['stage'] < 0 ? '状态有误' : '已完成'}
                                    status={entrustData['stage'] < 0 ? 'error' : 'finish'} />
                                <Step title='测试人员填写《软件测试方案》'
                                    description={entrustData['stage'] < 1 ? '等待测试人员填写' : '已完成'}
                                    status={entrustData['stage'] < 1 ? 'wait' : 'finish'} />
                                <Step title='质量部人员审核并填写《测试方案评审表》'
                                    description={entrustData['stage'] < 1 ? null :
                                        entrustData['stage'] < 2 ? '等待质量部人员审核' : 
                                        entrustData['stage'] === 2 ?'测试方案未通过':'已完成'}
                                    status={entrustData['stage'] < 1 ? 'wait' :
                                        entrustData['stage'] < 2 ? 'process' :
                                        entrustData['stage'] === 2 ?'process': 'finish'} />
                                <Step title='测试人员填写《测试用例》'
                                    description={entrustData['stage'] < 3 ? null :
                                        entrustData['stage'] < 4 ? '等待测试人员填写' : '已完成'}
                                    status={entrustData['stage'] < 3 ? 'wait' :
                                        entrustData['stage'] < 4 ? 'process' : 'finish'} />
                                <Step title='测试人员填写《软件测试记录》'
                                    description={entrustData['stage'] < 4 ? null :
                                        entrustData['stage'] < 5 ? '等待测试人员填写' : '已完成'}
                                    status={entrustData['stage'] < 4 ? 'wait' :
                                        entrustData['stage'] < 5 ? 'process' : 'finish'} />
                                <Step title='测试人员填写《软件测试问题清单》'
                                    description={entrustData['stage'] < 5 ? null :
                                        entrustData['stage'] < 6 ? '等待测试人员填写' : '已完成'}
                                    status={entrustData['stage'] < 5 ? 'wait' :
                                        entrustData['stage'] < 6 ? 'process' : 'finish'} />
                                <Step title='测试人员填写《软件文档评审表》'
                                    description={entrustData['stage'] < 6 ? null :
                                        entrustData['stage'] < 7 ? '等待测试人员填写' : '已完成'}
                                    status={entrustData['stage'] < 6 ? 'wait' :
                                        entrustData['stage'] < 7 ? 'process' : 'finish'} />
                                <Step title='测试人员填写《软件测试报告》'
                                    description={entrustData['stage'] < 7 ? null :
                                        entrustData['stage'] < 8 ? '等待测试人员填写' : '已完成'}
                                    status={entrustData['stage'] < 7 ? 'wait' :
                                        entrustData['stage'] < 8 ? 'process' : 'finish'} />
                                <Step title='质量部人员审核并填写《测试报告检查表》'
                                    description={entrustData['stage'] < 8 ? null :
                                        entrustData['stage'] < 9 ? '等待质量部人员审核' : 
                                        entrustData['stage'] === 9 ?'《软件测试报告》未通过':'已完成'}
                                    status={entrustData['stage'] < 8 ? 'wait' :
                                        entrustData['stage'] < 9 ? 'process' :
                                        entrustData['stage'] === 9 ?'process': 'finish'} />
                                <Step title='市场部人员填写《软件项目委托测试工作检查表》'
                                    description={entrustData['stage'] < 10 ? null :
                                        entrustData['stage'] < 11 ? '等待质量部人员审核' : 
                                        entrustData['stage'] === 12 ?'市场部未批准《软件测试报告》':'已完成'}
                                    status={entrustData['stage'] < 10 ? 'wait' :
                                        entrustData['stage'] < 11 ? 'process' :
                                        entrustData['stage'] === 12 ?'process': 'finish'} />
                                <Step title='项目测试完成'
                                    status={entrustData['stage'] ==11 ? 'finish' : 'wait'} />
                            </Steps>
                        </p>
                    </Panel>
                </Collapse>
                {(() => {
                    switch (entrustData['stage']) {
                        case 0: return (<Button id='填写软件测试方案' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TestPlan')}>填写软件测试方案</Button>);
                        case 1: return (<Button id='填写测试方案评审表' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TestScenarioReviewForm')}>填写测试方案评审表</Button>);
                        case 2: return (<Button id='重新填写软件测试方案' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TestPlan')}>重新填写软件测试方案</Button>);
                        case 3: return (<Button id='填写测试用例' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TestCase')}>填写测试用例</Button>);
                        case 4: return (<Button id='填写软件测试记录' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TestRecord')}>填写软件测试记录</Button>);
                        case 5: return (<Button id='填写软件测试问题清单' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('QuestionList')}>填写软件测试问题清单</Button>);
                        case 6: return (<Button id='填写软件文档评审表' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('SoftwareDocumentReviewForm')}>填写软件文档评审表</Button>);
                        case 7: return (<Button id='填写软件测试报告' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TestReport')}>填写软件测试报告</Button>);
                        case 8: return (<Button id='填写测试报告检查表' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('CheckList')}>填写测试报告检查表</Button>);
                        case 9: return (<Button id='重新填写软件测试报告' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TestReport')}>重新填写软件测试报告</Button>);
                        case 10: return (<Button id='填写软件项目委托测试工作检查表' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TestCheckList')}>填写软件项目委托测试工作检查表</Button>);
                        case 11:return null;
                        case 12: return (<Button id='重新填写软件测试报告' type="primary" style={{ marginLeft: 20 }}
                            onClick={() => ChangePage('TestReport')}>重新填写软件测试报告</Button>);
                    }
                })()}
                

            </div>)
    )


}

export default ViewProject
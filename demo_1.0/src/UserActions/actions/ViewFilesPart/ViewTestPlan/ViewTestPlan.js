import isMobile from 'is-mobile';
import React, { Component, Fragment } from 'react'
import { Descriptions, Collapse,message, DatePicker,TimePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './ViewTestPlan.css'
import moment from 'moment';
import { useEffect,useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { Typography } from 'antd';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';

const { Title, Paragraph, Text, Link } = Typography;

var _ = require('lodash');

function ViewTestPlan(props) {
    const { UpdateUserInfo, GotoPage, _state, focusedData } = props;
    const [entrustData, setEntrustData] = useState({ 'formData': null, '软件测试方案': null })
    const { Option } = Select;
    const { TextArea } = Input;
    const { Panel } = Collapse;

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
                            newData["formData"] = data
                            newData['软件测试方案'] = data['软件测试方案']
                            return newData
                        })
                    }
                })
        }
        else {
            fetch(REMOTE_SERVER + "/test/" + _state['PageInfo']['id'] + "/test-scheme", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                    'accessToken': _state['accessToken'],
                    'tokenType': _state['tokenType'],
                    'usrName': _state['userName'],
                    'usrID': _state['userID'],
                    'usrRole': _state['userRole'][0],
                    'Authorization': _state['accessToken'],
                    //'delegationId':_state['PageInfo']['id']
                },
            })
                .then(res => {
                    if (res.status != 200) {
                        alert('查询软件测试方案失败！')
                        return null
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    if (data != null) {
                        setEntrustData(prev => {
                            const newData = _.cloneDeep(prev)
                            newData['软件测试方案'] = data
                            return newData
                        })
                    }
                })
        }
    }
    useEffect(() => {
        if (focusedData === undefined)
            updateInfo();
        else{
            setEntrustData(prev => {
                const newData = _.cloneDeep(prev)
                newData['软件测试方案'] = focusedData
                return newData
            })
        }  
    }, []
    )


    return (
        entrustData['软件测试方案'] === null ? null : (
            <Form
                name="软件测试方案"
            >
                <h1 style={{ textAlign: 'center', fontSize: 30 }}>软件测试方案</h1>
                
                <Descriptions
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label={<h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>版本号</h4>} >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 30 }} >{entrustData['软件测试方案']['版本号']}</h4>
                    </Descriptions.Item>
                </Descriptions>

                <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>文档修改记录</h2>

                {entrustData['软件测试方案']['文档修改记录'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >版本号:{index['版本号']}</h4>} key="1">                       
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="AMD" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['AMD']}</h4>
                            </Descriptions.Item>
                           
                            <Descriptions.Item label="修订者" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['修订者']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="说明" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['说明']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="日期" >
                            <DatePicker disabled defaultValue={moment((index["日期"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>                            
                            </Descriptions.Item>
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                            
                </div>
                 )}

                <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>1.引言</h2>

                                    
                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="1.1标识" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['1.1标识']}</h4>
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="1.2系统概述" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['1.2系统概述']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="1.3文档概述" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['1.3文档概述']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="1.4基线" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['1.4基线']}</h4>
                    </Descriptions.Item>
                
                </Descriptions>

                <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>2.引用</h2>

                <Paragraph>
                《计算机软件文档编制规范》GB/T 8567－2006。
                </Paragraph>

                <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>3.软件测试环境</h2>

                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="3.1硬件" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['3.1硬件']}</h4>
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="3.2软件" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['3.2软件']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="3.3其他" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['3.3其他']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="3.4参与组织" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['3.4参与组织']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="3.5人员" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['3.5人员']}</h4>
                    </Descriptions.Item>
                
                </Descriptions>

                <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>4.计划</h2>

                <Paragraph>
                本章描述了计划测试的总范围并且描述了本测试计划适用的每个测试，包括对相关文档的审查。
                </Paragraph>

                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="4.1总体设计" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['4.1总体设计']}</h4>
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="4.1.1测试级别" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['4.1.1测试级别']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="4.1.2测试类别" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['4.1.2测试类别']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="4.1.3一般测试条件" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['4.1.3一般测试条件']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="4.2计划执行的测试" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['4.2计划执行的测试']}</h4>
                    </Descriptions.Item>

                    <Descriptions.Item label="4.3测试用例" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['4.3测试用例']}</h4>
                    </Descriptions.Item>
                
                </Descriptions>

                <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>5.测试进度表</h2>

                <Paragraph>
                此项目主要分为：业务测试和文档审查两部分的工作。两部分的工作可以并行完成。测试方为完成本方案所述的测试所需时间大约为XX个工作日，如测试需求产生变更会导致测试时间的变化。
                </Paragraph>

                <Paragraph>
                下表大致估计了本次测试各个阶段所需工作量及起止时间。
                </Paragraph>

        
                <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>制定测试计划</h4>                           
                
                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="工作量" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['测试进度表']['制定测试计划']['工作量']}</h4>
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="开始时间" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试方案']['测试进度表']['制定测试计划']["开始时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>                            
                    </Descriptions.Item>

                    <Descriptions.Item label="结束时间" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试方案']['测试进度表']['制定测试计划']["结束时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>                            
                    </Descriptions.Item>

                </Descriptions>

                <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>设计测试</h4>  

                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="工作量" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['测试进度表']['设计测试']['工作量']}</h4>
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="开始时间" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试方案']['测试进度表']['设计测试']["开始时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>                            
                    </Descriptions.Item>

                    <Descriptions.Item label="结束时间" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试方案']['测试进度表']['设计测试']["结束时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>                            
                    </Descriptions.Item>

                </Descriptions>

                <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>执行测试</h4>  

                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="工作量" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['测试进度表']['执行测试']['工作量']}</h4>
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="开始时间" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试方案']['测试进度表']['执行测试']["开始时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>                            
                    </Descriptions.Item>

                    <Descriptions.Item label="结束时间" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试方案']['测试进度表']['执行测试']["结束时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>                            
                    </Descriptions.Item>

                </Descriptions>

                <h4 style={{ fontWeight: 'bolder', marginTop: 30 }}>评估测试</h4>  

                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="工作量" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['测试进度表']['评估测试']['工作量']}</h4>
                    </Descriptions.Item>
                    
                    <Descriptions.Item label="开始时间" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试方案']['测试进度表']['评估测试']["开始时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>                            
                    </Descriptions.Item>

                    <Descriptions.Item label="结束时间" >
                    <DatePicker disabled defaultValue={moment((entrustData['软件测试方案']['测试进度表']['评估测试']["结束时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>                            
                    </Descriptions.Item>

                </Descriptions>

                <h2 style={{ fontWeight: 'bolder', marginTop: 30 }}>6.需求的可追踪性</h2>
      
                <Descriptions
                bordered
                layout='vertical'
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >

                    <Descriptions.Item label="需求的可追踪性" >
                    <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{entrustData['软件测试方案']['需求的可追踪性']}</h4>
                    </Descriptions.Item>
                    
                
                </Descriptions>
                        
   
              

            </Form>
        )

    )
}

export default ViewTestPlan
import isMobile from 'is-mobile';
import React, { Component, Fragment } from 'react'
import { Descriptions, Collapse,message, DatePicker,TimePicker,Divider, Form, Select, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, Input } from 'antd';
import './ViewTestCase.css'
import moment from 'moment';
import { useEffect,useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { Typography } from 'antd';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';

var _ = require('lodash');

function ViewTestCase(props) {
    const { UpdateUserInfo, GotoPage, _state, focusedData } = props;
    const [entrustData, setEntrustData] = useState({ 'formData': null, '测试用例电子记录': null })
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
                            newData['测试用例电子记录'] = data['测试用例电子记录']
                            return newData
                        })
                    }
                })
        }
        else {
            fetch(REMOTE_SERVER+"/test/"+_state['PageInfo']['id']+"/test-doc/test-case", {
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
                        alert('查询测试用例电子记录失败！')
                        return null
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    if (data != null) {
                        setEntrustData(prev => {
                            const newData = _.cloneDeep(prev)
                            newData['测试用例电子记录'] = data['TestCaseDto']
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
                newData['测试用例电子记录'] = focusedData
                return newData
            })
        }  
    }, []
    )


    return (
        entrustData['测试用例电子记录'] === null ? null : (
            <Form
                name="测试用例电子记录"
            >
                <h1 style={{ textAlign: 'center', fontSize: 30 }}>测试用例(电子记录)</h1>

                {entrustData['测试用例电子记录']['测试用例'].map((index)=>
                <div>
                    <Collapse  bordered={false} ghost defaultActiveKey={['1']}>
                        <Panel header={<h4 style={{ fontWeight: 'bolder'}} >ID:{index['ID']}</h4>} key="1">                       
                        <Descriptions
                        bordered
                        layout='vertical'
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        >

                            <Descriptions.Item label="测试分类" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试分类']}</h4>
                            </Descriptions.Item>
                           
                            <Descriptions.Item label="测试用例设计说明" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试用例设计说明']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="与本测试用例有关的规约说明" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['与本测试用例有关的规约说明']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="预期的结果" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['预期的结果']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="测试用例设计者" >
                            <h4 style={{ fontWeight: 'bolder', marginTop: 10 }} >{index['测试用例设计者']}</h4>
                            </Descriptions.Item>

                            <Descriptions.Item label="测试时间" >
                            <DatePicker disabled defaultValue={moment((index["测试时间"]), 'YYYY/MM/DD')} format='YYYY/MM/DD'/>                           
                            </Descriptions.Item>
                            
                        </Descriptions>
                        </Panel>
                    </Collapse>
                                            
                </div>
                 )}
                
              
              
                        
   
              

            </Form>
        )

    )
}

export default ViewTestCase
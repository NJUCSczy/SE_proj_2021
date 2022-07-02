import React, { Component } from 'react'
import { Tooltip, Input, Select, Form, message, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getStageByInfo, getStatusInfo, REMOTE_SERVER } from '../../../functions/functions'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

var _ = require('lodash');

function OfflineSignContract(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [formData, setFormData] = useState({ 'files': {} })
    const { Option } = Select;
    const { TextArea } = Input;

    const setDataByKey = (key, val) => {
        setFormData(prev => {
            const newFormData = _.cloneDeep(prev)
            newFormData[key] = val;
            console.log(newFormData)
            return newFormData;
        })
    }

    const updateInfo = () => {
        fetch(REMOTE_SERVER + "/contract/" + _state['PageInfo']['ContractID'] + "/files/unsignedContractTable", {
            method: "GET",
            mode: 'cors',
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
                    setFormData(prev => {
                        const newData = _.cloneDeep(prev)
                        newData["files"]["contractTable"] = data
                        return newData
                    })
                }
            })
        fetch(REMOTE_SERVER + "/contract/" + _state['PageInfo']['ContractID'] + "/files/unsignedNondisclosureAgreementTable", {
            method: "GET",
            mode: 'cors',
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
                    setFormData(prev => {
                        const newData = _.cloneDeep(prev)
                        newData["files"]["nondisclosureAgreementTable"] = data
                        return newData
                    })
                }
            })
    }
    useEffect(() => {
        updateInfo();
    }, []
    )

    const OnFinishForm = (values) => {
        message.loading({ content: "上传中", key: "upload" })
        const res = new FormData();
        res.append('contractTable', values['签章']['file']);
        res.append('nondisclosureAgreementTable', values['保密协议']['file']);
        fetch(REMOTE_SERVER + "/contract/" + _state['PageInfo']['ContractID'] + "/files", {
            method: "POST",
            headers: {
                'credentials': 'same-origin',
                'accessToken': _state['accessToken'],
                'tokenType': _state['tokenType'],
                'usrName': _state['userName'],
                'usrID': _state['userID'],
                'usrRole': _state['userRole'][0],
                'Authorization': _state['accessToken']
            },
            body: res
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    message.success({ content: "上传成功！", key: "upload" })
                    GotoPage("ViewEntrust", _state)
                }
                else {
                    message.error({ content: "上传失败！", key: "upload" })
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
            })
    }

    return (
        formData['files']["nondisclosureAgreementTable"] === undefined || formData['files']["contractTable"] === undefined ? (null) : (<div>
            <h1>空白表下载</h1>
            <div><a href={formData["files"]["contractTable"]['fileUri']}><Tooltip title="点击下载" placement='right'>{formData["files"]["contractTable"]['fileName']}</Tooltip></a></div>
            <div><a href={formData["files"]["nondisclosureAgreementTable"]['fileUri']}><Tooltip title="点击下载" placement='right'>{formData["files"]["nondisclosureAgreementTable"]['fileName']}</Tooltip></a></div>
            <Form
                name="软件文档"
                initialValues={{ remember: true }}
                onFinish={OnFinishForm}
                onFinishFailed={null}
                style={{ padding: '20px 30px' }}
                labelCol={{ span: 10, flex: 'auto' }}
                wrapperCol={{ span: 20 }}
                layout='vertical'
                autoComplete="false">
                <h1>上传软件文档</h1>
                <h2>需求文档</h2>
                <h3>保密协议</h3>
                <h2>文件上传</h2>
                <h3>合同签章</h3>
                <Form.Item
                    name="签章"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if ((formData.hasOwnProperty("签章") && formData["签章"].length > 0)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('请填写上传一份合同签章！'));
                            },
                        }),
                    ]}
                >
                    <Upload
                        id='签章'
                        beforeUpload={(file, fileList) => {
                            const newFileList = formData.hasOwnProperty("签章") ? [...formData["签章"], file] : [file];
                            setDataByKey("签章", newFileList);
                            return false;
                        }}
                        onRemove={(file) => {
                            var index = -1;
                            for (var i = 0; i < formData["签章"].length; i = i + 1) {
                                if (formData["签章"][i]['uid'] === file['uid']) {
                                    index = i; break;
                                }
                            }
                            if (index < 0) return
                            const newFileList = formData["签章"].slice();
                            newFileList.splice(index, 1);
                            setDataByKey("签章", newFileList);
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>
                <h3>保密协议</h3>
                <Form.Item
                    name="保密协议"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if ((formData.hasOwnProperty("保密协议") && formData["保密协议"].length > 0)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('请填写上传一份保密协议！'));
                            },
                        }),
                    ]}
                >
                    <Upload
                        id='保密协议'
                        beforeUpload={(file, fileList) => {
                            const newFileList = formData.hasOwnProperty("保密协议") ? [...formData["保密协议"], file] : [file];
                            setDataByKey("保密协议", newFileList);
                            return false;
                        }}
                        onRemove={(file) => {
                            var index = -1;
                            for (var i = 0; i < formData["保密协议"].length; i = i + 1) {
                                if (formData["保密协议"][i]['uid'] === file['uid']) {
                                    index = i; break;
                                }
                            }
                            if (index < 0) return
                            const newFileList = formData["保密协议"].slice();
                            newFileList.splice(index, 1);
                            setDataByKey("保密协议", newFileList);
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button id='提交' type="primary" htmlType="submit">
                    提交
                    </Button>
                </Form.Item>
            </Form>
        </div>)
    )

}
export default OfflineSignContract;
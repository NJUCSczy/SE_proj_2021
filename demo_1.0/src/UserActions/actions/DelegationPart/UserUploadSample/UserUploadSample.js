import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { message, Button, Upload, Form, Radio, Col, Input } from 'antd';
import { useState, useEffect } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { USE_JSON_SERVER, REMOTE_SERVER } from '../../../functions/functions';

var _ = require('lodash');
var mobile = require('is-mobile');

function UserUploadSample(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [formData, setFormData] = useState({ '软件介质': null })
    const setDataByKey = (key, val) => {
        setFormData(prev => {
            const newFormData = _.cloneDeep(prev)
            newFormData[key] = val;
            console.log(newFormData)
            return newFormData;
        })
    }

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
                        setFormData(prev => {
                            const newData = _.cloneDeep(prev)
                            newData['软件介质'] = data['用户申请表']['样品和数量']['软件介质']
                            return newData
                        })
                    }

                })
        }
        else {
            fetch(REMOTE_SERVER + "/delegation/" + _state['PageInfo']['id'], {
                method: "GET",
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                    'accessToken': _state['accessToken'],
                    'tokenType': _state['tokenType'],
                    'usrName': _state['userName'],
                    'usrID': _state['userID'],
                    'usrRole': _state['userRole'],
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
                            newData['软件介质'] = data['用户申请表']['样品和数量']['软件介质']
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

    const OnFinishForm = (values) => {
        console.log(values)
        if(USE_JSON_SERVER)return
        if(formData["软件介质"] === '在线上传'){
            const res = new FormData();
            values['样品文件']['fileList'].forEach(_file => {
                res.append('样品文件',_file)
            });
            res.append('备注',values['备注'])
            console.log(res.get('样品文件'))
            SubmitFormWithFile(res)
        }
        else{
            SubmitFormWOFile(values)
        }
    }

    const SubmitFormWithFile = (_form) => {
        message.loading({ content: "上传中", key: "upload" })
        fetch(REMOTE_SERVER + "/delegation/" + _state['PageInfo']['id'] + "/files", {
            method: "POST",
            headers: {
                'credentials': 'same-origin',
                'accessToken': _state['accessToken'],
                'tokenType': _state['tokenType'],
                'usrName': _state['userName'],
                'usrID': _state['userID'],
                'usrRole': _state['userRole'],
                'Authorization': _state['accessToken']
            },
            body: _form
        })
            .then(res => {
                console.log(res)
                if (res.status === 201) {
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

    const SubmitFormWOFile = (_form) => {
        fetch(REMOTE_SERVER+"/audit/delegation/test/" + _state['PageInfo']['id'], {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              'accessToken': _state['accessToken'],
              'tokenType': _state['tokenType'],
              'usrName': _state['userName'],
              'usrID': _state['userID'],
              'usrRole': _state['userRole'],
              'Authorization': _state['accessToken']
            },
            body: JSON.stringify(_form)
          })
            .then(res => {
              console.log(res)
              if (res.status === 200) {
                message.success({ content: "提交成功！", key: "upload" })
                GotoPage("ViewEntrust", _state)
              }
              else {
                message.error({ content: "提交失败！", key: "upload" })
              }
              return res.json()
            })
            .then(data => {
              console.log(data)
            })
    }

    return (
        formData['软件介质'] === null ? null : (
            <Form
                name="软件样品"
                initialValues={{ remember: true }}
                onFinish={OnFinishForm}
                onFinishFailed={null}
                style={{ padding: '20px 30px' }}
                labelCol={{ span: 10, flex: 'auto' }}
                wrapperCol={{ span: 20 }}
                layout='vertical'
                autoComplete="false">
                <h1>提交软件样品</h1>
                <Radio.Group disabled defaultValue={formData["软件介质"]}>
                    <Col span={30} >
                        <Radio value="光盘" style={{ lineHeight: '32px' }} >光盘</Radio>
                    </Col>
                    <Col span={30}>
                        <Radio value="U盘" style={{ lineHeight: '32px' }}>U盘</Radio>
                    </Col>
                    <Col span={30}>
                        <Radio value="在线上传" style={{ lineHeight: '32px' }} >在线上传</Radio>
                    </Col>
                </Radio.Group>
                {formData["软件介质"] === '在线上传' ? (<div>
                    <h2>上传样品</h2>
                    <Form.Item
                        name="样品文件"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if ((formData.hasOwnProperty("样品文件") && formData["样品文件"].length > 0)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('请填写上传一份样品文件！'));
                                },
                            }),
                        ]}
                    >
                        <Upload
                            beforeUpload={(file, fileList) => {
                                const newFileList = formData.hasOwnProperty("样品文件") ? [...formData["样品文件"], file] : [file];
                                setDataByKey("样品文件", newFileList);
                                return false;
                            }}
                            onRemove={(file) => {
                                var index = -1;
                                for (var i = 0; i < formData["样品文件"].length; i = i + 1) {
                                    if (formData["样品文件"][i]['uid'] === file['uid']) {
                                        index = i; break;
                                    }
                                }
                                if (index < 0) return
                                const newFileList = formData["样品文件"].slice();
                                newFileList.splice(index, 1);
                                setDataByKey("样品文件", newFileList);
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                    </Form.Item>
                </div>) : null}
                <h2 style={{ paddingTop: 40 }}>备注</h2>
                <Form.Item
                    name='备注'
                    rules={[{ required: true, message: '请填写备注' }]}
                ><Input.TextArea rows={3} style={{ maxWidth: 700 }} /></Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>)
    )
}
export default UserUploadSample
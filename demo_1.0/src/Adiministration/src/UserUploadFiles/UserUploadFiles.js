import isMobile from 'is-mobile';
import React, { Component } from 'react'
import { message, Button, Upload, Form } from 'antd';
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../functions/functions';

var _ = require('lodash');
var mobile = require('is-mobile');

function UserUploadFiles(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [formData, setFormData] = useState({'用户文档':[],'需求文档':[],'操作文档':[]})
    

    const setDataByKey = (key, val) => {
        setFormData(prev => {
            const newFormData = _.cloneDeep(prev)
            newFormData[key] = val;
            console.log(newFormData)
            return newFormData;
        })

    }

    const OnFinishForm = (values) => {
        message.loading({content:"上传中",key:"upload"})
        const res=new FormData();
        res.append('usrManual',values['用户文档']['file']);
        res.append('installationManual',values['需求文档']['file']);
        res.append('operationManual',values['操作文档']['file']);
        fetch(REMOTE_SERVER+"/delegation/" + _state['PageInfo']['id'] + "/files", {
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
            body: res
        })
            .then(res => {
                console.log(res)
                if (res.status === 201) {
                    message.success({content:"上传成功！",key:"upload"})
                    GotoPage("ViewEntrust",_state)
                }
                else{
                    message.error({content:"上传失败！",key:"upload"})
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
            })
    }

    return (
        <Form
            name="软件项目委托测试申请书"
            initialValues={{ remember: true }}
            onFinish={OnFinishForm}
            onFinishFailed={null}
            style={{ padding: '20px 30px' }}
            labelCol={{ span: 10, flex: 'auto' }}
            wrapperCol={{ span: 20 }}
            layout='vertical'
            autoComplete="false">
            <h1>用户文件上传</h1>
            <h2>需求文档</h2>
            <Form.Item
                name="需求文档"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if ((formData.hasOwnProperty("需求文档") && formData["需求文档"].length > 0)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('请填写上传一份需求文档！'));
                        },
                    }),
                ]}
            >
                <Upload
                    beforeUpload={(file, fileList) => {
                        const newFileList = formData.hasOwnProperty("需求文档") ? [...formData["需求文档"], file] : [file];
                        setDataByKey("需求文档", newFileList);
                        return false;
                    }}
                    onRemove={(file) => {
                        var index = -1;
                        for (var i = 0; i < formData["需求文档"].length; i = i + 1) {
                            if (formData["需求文档"][i]['uid'] === file['uid']) {
                                index = i; break;
                            }
                        }
                        if (index < 0) return
                        const newFileList = formData["需求文档"].slice();
                        newFileList.splice(index, 1);
                        setDataByKey("需求文档", newFileList);
                    }}
                >
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
            </Form.Item>

            <h2>用户文档</h2>
            <Form.Item
                name="用户文档"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if ((formData.hasOwnProperty("用户文档") && formData["用户文档"].length > 0)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('请填写上传一份用户文档！'));
                        },
                    }),
                ]}
            >
                <Upload
                    beforeUpload={(file, fileList) => {
                        const newFileList = formData.hasOwnProperty("用户文档") ? [...formData["用户文档"], file] : [file];
                        setDataByKey("用户文档", newFileList);
                        return false;
                    }}
                    onRemove={(file) => {
                        var index = -1;
                        for (var i = 0; i < formData["用户文档"].length; i = i + 1) {
                            if (formData["用户文档"][i]['uid'] === file['uid']) {
                                index = i; break;
                            }
                        }
                        if (index < 0) return
                        const newFileList = formData["用户文档"].slice();
                        newFileList.splice(index, 1);
                        setDataByKey("用户文档", newFileList);
                    }}
                >
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
            </Form.Item>

            <h2>操作文档</h2>
            <Form.Item
                name="操作文档"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if ((formData.hasOwnProperty("操作文档") && formData["操作文档"].length > 0)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('请填写上传一份操作文档！'));
                        },
                    }),
                ]}
            >
                <Upload
                    beforeUpload={(file, fileList) => {
                        const newFileList = formData.hasOwnProperty("操作文档") ? [...formData["操作文档"], file] : [file];
                        setDataByKey("操作文档", newFileList);
                        return false;
                    }}
                    onRemove={(file) => {
                        var index = -1;
                        for (var i = 0; i < formData["操作文档"].length; i = i + 1) {
                            if (formData["操作文档"][i]['uid'] === file['uid']) {
                                index = i; break;
                            }
                        }
                        if (index < 0) return
                        const newFileList = formData["操作文档"].slice();
                        newFileList.splice(index, 1);
                        setDataByKey("操作文档", newFileList);
                    }}
                >
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}
export default UserUploadFiles
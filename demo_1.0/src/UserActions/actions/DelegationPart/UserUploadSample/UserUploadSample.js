import isMobile from 'is-mobile';
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { message, Button, Upload, Form, Radio, Col, Input } from 'antd';
import { useState, useEffect } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { NoFormStatus } from 'antd/lib/form/context';
import { USE_JSON_SERVER, REMOTE_SERVER } from '../../../functions/functions';

var _ = require('lodash');
var mobile = require('is-mobile');

/**
 * 若用户选择用U盘或光盘提交样品，那么此处需要填写备注信息；  
 * 
 * 若用户选择在线上传样品，那么此处需要上传文件
 */
function UserUploadSample(props) {
    const { UpdateUserInfo, GotoPage, _state, focusedData } = props;
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
                            newData['软件介质'] = data['applicationTable']['样品和数量']['软件介质']
                            return newData
                        })
                    }

                })
        }
    }
    useEffect(() => {
        if (focusedData === undefined)
            updateInfo();
        else {
            setFormData(prev => {
                const newData = _.cloneDeep(prev)
                newData['软件介质'] = focusedData
                return newData
            })
        }
    }, []
    )

    const OnFinishForm = (values) => {
        console.log(values)
        if (USE_JSON_SERVER) return
        if (formData["软件介质"] === '在线上传') {
            SubmitFormWithFile(values)
        }
        else {
            SubmitFormWOFile(values)
        }
    }

    const SubmitFormWithFile = (values) => {
        const _form = new FormData();
        _form.append('样品', values['样品文件']['file'])
        //_form.append('备注',values['备注'])
        message.loading({ content: "上传中", key: "upload" })
        fetch(REMOTE_SERVER + "/sample/online/" + _state['PageInfo']['id'], {
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
        fetch(REMOTE_SERVER + "/sample/offline/" + _state['PageInfo']['id'], {
            method: "POST",
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
            body: JSON.stringify(_form)
        })
            .then(res => {
                console.log(res)
                if (res.status === 201) {
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
                        id='样品文件'
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
                ><Input.TextArea id='备注' rows={3} style={{ maxWidth: 700 }} /></Form.Item>

                <Form.Item>
                    <Button id='提交' type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>)
    )
}
export default UserUploadSample

UserUploadSample.propTypes = {
    /** 用户状态 */
    _state: PropTypes.object,
    /** 更新用户状态方法 */
    UpdateUserInfo: PropTypes.func,
    /** 切换界面方法 */
    GotoPage: PropTypes.func,
    /** 用户之前选择的样品提交方式，仅在测试情况下有此参数，正常流程中应为undefined */
    focusedData: PropTypes.string,
}

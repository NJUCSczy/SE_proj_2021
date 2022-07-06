import isMobile from 'is-mobile';
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { USE_JSON_SERVER,REMOTE_SERVER } from '../../../functions/functions';
var _ = require('lodash');

/**
 * 
 * 查看生成的Latex报告的界面
 * 
 */
function ViewLatexTestReport(props) {
    const { UpdateUserInfo, GotoPage, _state, focusedData } = props;
    const [formData, setFormData] = useState({ 'files': null,'error':false })

    const UpdateInfo = () => {
        fetch(REMOTE_SERVER + "/test/" + _state['PageInfo']['id'] + "/latexReport", {
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
                    if(data['status']!=undefined && data['status']!=200){
                        setFormData(prev => {
                            const newData = _.cloneDeep(prev)
                            newData['error'] = true
                            return newData
                        })
                        return
                    }
                    setFormData(prev => {
                        const newData = _.cloneDeep(prev)
                        newData['files'] = data
                        return newData
                    })
                }
            })
    }
    useEffect(() => {
        if (focusedData === undefined)
            UpdateInfo();
        else {
            setFormData(prev => {
                const newData = _.cloneDeep(prev)
                newData['files'] = focusedData
                return newData
            })
        }
    }, []
    )

    return USE_JSON_SERVER ? (null) : formData['files'] == null ? null : (
        formData['error']?(
            <div><h1 style={{ fontWeight: 'bolder', marginTop: 30 }}>读取报告文件失败！</h1></div>
        ):(
        <div>
            <h1 style={{ fontWeight: 'bolder', marginTop: 30 }}>查看测试报告Latex文档</h1>
            <Button href={formData['files']['fileUri']} target='_blank'>点击下载</Button>
        </div>)
    )

}

export default ViewLatexTestReport;
ViewLatexTestReport.propTypes = {
    /** 用户状态 */
    _state: PropTypes.object,
    /** 更新用户状态方法 */
    UpdateUserInfo: PropTypes.func,
    /** 切换界面方法 */
    GotoPage: PropTypes.func
}

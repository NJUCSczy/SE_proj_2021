import React, { Component } from 'react'
import { Tooltip, Input,Select } from 'antd';
import { getStageByInfo, getStatusInfo,REMOTE_SERVER } from '../../functions/functions'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

var _ = require('lodash');

function ViewUserFiles(props) {
    const { UpdateUserInfo, GotoPage, _state } = props;
    const [formData, setFormData] = useState({ 'files': null })
    const { Option } = Select;
    const { TextArea } = Input;

    const updateInfo = () => {
        fetch(REMOTE_SERVER+"/delegation/" + _state['PageInfo']['id'] + "/files", {
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
                console.log(data )
                if (data != null && data.hasOwnProperty('files')) {
                    setFormData(prev => {
                        const newData = _.cloneDeep(prev)
                        newData["files"] = data['files']
                        return newData
                    })
                }
            })
    }
    useEffect(() => {
        updateInfo();
    }, []
    )

    return (
        formData['files'] === null ? (null) :(<div>
            <h1>文件列表</h1>
                {formData['files'].map((file,index) =><div><a href={file['fileUri']}><Tooltip title="点击下载" placement='right'>{file['fileName']}</Tooltip></a></div>)}
        </div>)
    )

}
export default ViewUserFiles;
import './ViewEntrustList.css'
import React from 'react';
import { Table, Tag, Space, message, Button, Input, Select } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { getStageByInfo, getStatusInfo, getStageByDelegationState, getStatusByDelegationState, USE_JSON_SERVER, REMOTE_SERVER } from '../../../functions/functions'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const { Option } = Select;
var _ = require('lodash');

function ViewEntrustList(props) {
  const { UpdateUserInfo, GotoPage, _state } = props;
  const [entrustData, setEntrustData] = useState({ 'formData': null })
  const [formData, setFormData] = useState({ 'formData': null })

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: '??????',
      dataIndex: (USE_JSON_SERVER) ? 'id' : 'delegationId',
      key: 'id',
      width: 100,
      sorter: (a, b) => (USE_JSON_SERVER) ? a.id - b.id : a.delegationId.localeCompare(b.delegationId),
      sortDirections: ['descend'],
      ...getColumnSearchProps((USE_JSON_SERVER) ? 'id' : 'delegationId'),
    },
    {
      title: '??????',
      dataIndex: (USE_JSON_SERVER) ? 'userName' : 'usrBelonged',
      sorter: (a, b) => (USE_JSON_SERVER) ? a.userName - b.userName : a.usrBelonged.localeCompare(b.usrBelonged),
      sortDirections: ['descend'],
      key: 'userName',
      ...getColumnSearchProps((USE_JSON_SERVER) ? 'userName' : 'usrBelonged'),
    },
    {
      title: '????????????',
      dataIndex: (USE_JSON_SERVER) ? '???????????????' : 'applicationTable',
      key: '????????????',
      render: (userApplication) => (
        <Space size="middle">
          {userApplication === null ? null : userApplication["????????????"]}
        </Space>
      )
    },
    {
      title: '??????',
      key: 'status',
      render: (userApplication) => (
        USE_JSON_SERVER ?
          (<Space size="middle">
            {getStatusInfo(userApplication)
            }
          </Space>) : (
            <Space size="middle">
              {getStatusByDelegationState(userApplication['state'])
              }
            </Space>)
      )
    },
    {
      title: '??????',
      key: 'action',
      textWrap: 'word-break',
      render: (userApplication) => (
        USE_JSON_SERVER ? (
          <Space size="middle">
            <a id='view_entrust'
              onClick={() => gotoEntrustPage(userApplication['id'], -1)}
            >??????</a>
          </Space>) : (<Space size="middle">
            <a id='view_entrust'
              onClick={() => gotoEntrustPage(userApplication['delegationId'], userApplication['contractId'])}
            >??????</a>
          </Space>)
      ),
    },
  ];
  const gotoEntrustPage = (id, ContractID) => {
    _state['PageInfo']['id'] = id;
    _state['PageInfo']['ContractID'] = ContractID
    UpdateUserInfo({ PageInfo: { 'id': id,'ContractID':ContractID } }, GotoPage('ViewEntrust', _state))
  }
  const updateInfo = () => {
    if (USE_JSON_SERVER) {
      fetch("http://localhost:8000/forms", {
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
              return newData
            })
          }
          if (data != null) {
            setFormData(prev => {
              const newData = _.cloneDeep(prev)
              newData["formData"] = data
              return newData
            })
          }
        })
    }
    else {
      const URL = _state['userRole'][0] === 'ROLE_USER' ? (REMOTE_SERVER + "/delegations") : (REMOTE_SERVER + "/delegations/all")
      console.log(URL)
      fetch(URL, {
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
          if (res.status === 200) {
            message.success({ content: "????????????????????????", key: "getEntrustList", duration: 2 })
          }
          else if (res.status === 401) {
            alert("???????????????")
            GotoPage("Login", _state)
          }
          else {
            message.error({ content: "????????????????????????", key: "getEntrustList", duration: 2 })
          }

          return res.json()
        })
        .then(data => {
          console.log(data)
          if (data != null) {
            setEntrustData(prev => {
              const newData = _.cloneDeep(prev)
              newData["formData"] = data
              return newData
            })
          }
          if (data != null) {
            setFormData(prev => {
              const newData = _.cloneDeep(prev)
              newData["formData"] = data
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

  const FliterDataByState = (State) => {
    switch(State){
      case '??????':FliterDataByStage(-1,100);break;
      case '??????????????????':FliterDataByStage(-1,-1);break;
      case '???????????????':FliterDataByStage(0,12);break;
      case '???????????????':FliterDataByStage(13,100);break;
      case '???????????????':FliterDataByStage(21,100);break;
      case '????????????????????????':FliterDataByStage(0,2);break;
      case '???????????????':FliterDataByStage(3,7);break;
      case '?????????':FliterDataByStage(8,12);break;
      case '?????????????????????':FliterDataByStage(13,17);break;
      case '?????????????????????':FliterDataByStage(18,20);break;
    }
  }

  const FliterDataByStage = (minStage, maxStage) => {
    setFormData(prev => {
      const newData = _.cloneDeep(entrustData)
      const res = {'formData':[]}
      newData["formData"].forEach(element => {
        if (USE_JSON_SERVER) {
          if (getStageByInfo(element) >= minStage && getStageByInfo(element) <= maxStage)
            res["formData"].push(element);
        } else {
          if (getStageByDelegationState(element['state']) >= minStage && getStageByDelegationState(element['state']) <= maxStage)
            res["formData"].push(element)
        }
      });
      console.log(res)
      return res;
    })
  }

  return (
    <>
      <Select defaultValue="??????" style={{ width: 160, marginLeft: 30,marginTop:20,marginBottom:20 }} onChange={FliterDataByState}>
        <Option value="??????">??????</Option>
        <Option value="??????????????????">??????????????????</Option>
        <Option value="???????????????">???????????????</Option>
        <Option value="???????????????">???????????????</Option>
        <Option value="???????????????">???????????????</Option>
        <Option value="????????????????????????">????????????????????????</Option>
        <Option value="???????????????">???????????????</Option>
        <Option value="?????????">?????????</Option>
        <Option value="?????????????????????">?????????????????????</Option>
        <Option value="?????????????????????">?????????????????????</Option>
      </Select>
      <Table
        style={{ marginLeft: 20, marginRight: 20 }}
        pagination={{ pageSize: 7 }}
        columns={columns}
        dataSource={formData['formData']}
        rowKey="id"
      /></>
  )
}

export default ViewEntrustList

TestAgreement 示例  

```js
import { Button, Dropdown, Steps, Space, Collapse, } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
<Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 8 }} rotate={isActive ?90 : 0} />}>
<Panel header={<h4>展开</h4>} key="1">
<TestAgreement focusedData={{
    '用户申请表':{
        '软件名称':'测试软件',
        '委托单位(中文)':'南京大学'
    },
    '报价单':{
        '基本信息':{
            '总计':1000
        },
    }
}}/>
</Panel>
</Collapse>
```
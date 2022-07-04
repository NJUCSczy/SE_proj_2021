ConfidentialAgreementPartyA 示例  

```js
import { Button, Dropdown, Steps, Space, Collapse, } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
<Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 8 }} rotate={isActive ?90 : 0} />}>
<Panel header={<h4>展开</h4>} key="1">
<ConfidentialAgreementPartyA focusedData={{
    '保密协议':{
        '市场部部分':{
            '委托方':'南京大学',
            '项目名':'测试项目'
            }
        }
    }
}/>
</Panel>
</Collapse>
```
CheckTA 示例  

```js
import { Button, Dropdown, Steps, Space, Collapse, } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
<Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 8 }} rotate={isActive ?90 : 0} />}>
<Panel header={<h4>展开</h4>} key="1">
<CheckTA focusedData={{
    '用户申请表':{
        '软件名称':'测试软件',
        '委托单位(中文)':'南京大学'
    },
    '报价单':{
        '基本信息':{
            '总计':1000
        },
    },
    '履行期限(受托方部分)':{
        '受托方(乙方)':'南京大学测试中心',
        '签订地点':'南京大学',
        '签订日期':'2022.2.2',
        '合同履行期限':'20',
        '整改限制次数':'4',
        '一次整改限制的天数':'5'
    }
}}/>
</Panel>
</Collapse>
```
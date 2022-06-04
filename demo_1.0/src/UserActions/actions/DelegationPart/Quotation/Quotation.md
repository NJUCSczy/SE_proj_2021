Quotation 示例  

可点击“添加新项目”来添加表项
```js
import { Button, Dropdown, Steps, Space, Collapse, } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
<Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 8 }} rotate={isActive ?90 : 0} />}>
<Panel header={<h4>展开</h4>} key="1">
<Quotation/>
</Panel>
</Collapse>
```
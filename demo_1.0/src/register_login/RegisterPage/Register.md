Register展示:  

[](注释：此处```后的js代表这段代码需要进行渲染。另外，下拉栏是为了良好的阅读体验而添加的，请大家也添加一下) 

```js 
import { Button, Dropdown, Steps, Space, Collapse, } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
<Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 8 }} rotate={isActive ?90 : 0} />}>
<Panel header={<h4>展开</h4>} key="1">
<RegisterPage/>
</Panel>
</Collapse>
```

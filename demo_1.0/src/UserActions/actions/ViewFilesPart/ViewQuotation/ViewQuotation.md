ViewQuotation 示例  

可点击“添加新项目”来添加表项
```js
import { Button, Dropdown, Steps, Space, Collapse, } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
<Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 8 }} rotate={isActive ?90 : 0} />}>
<Panel header={<h4>展开</h4>} key="1">
<ViewQuotation focusedData={{
        "基本信息": {
          "软件名称": "示例项目",
          "项目列表": [
            {
              "项目": "项目1",
              "分项": "分项1",
              "单价": "123",
              "说明": "无",
              "行合计": "123"
            }
          ],
          "小计": "123",
          "税率(8%)": "133",
          "总计": "133"
        },
        "用户反馈": null
      }}/>
</Panel>
</Collapse>
```
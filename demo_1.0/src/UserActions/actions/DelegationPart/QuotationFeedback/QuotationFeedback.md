QuotationFeedback 示例  

先展示当前的报价单，然后需要用户选择回复结果
```js
import { Button, Dropdown, Steps, Space, Collapse, } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
<Collapse ghost={true} expandIcon={({ isActive }) => <CaretRightOutlined style={{ paddingTop: 8 }} rotate={isActive ?90 : 0} />}>
<Panel header={<h4>展开</h4>} key="1">
<QuotationFeedback focusedQuotationData={{
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
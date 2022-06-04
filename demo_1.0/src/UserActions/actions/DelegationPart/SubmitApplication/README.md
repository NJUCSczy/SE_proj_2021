# 表格进行响应式布局及相关优化
## 使用antd自带的description来进行响应式布局的实现
- 在对antd的引用中加上对description的相关引用
  ```
  import { Descriptions } from 'antd';
  ```
- 以简单的文本输入框为例
  ```
  <Form.Item
        name="软件名称"
        rules={[{ required: true, message: '请填写软件名称' }]}
      >

        <Input id="软件名称" style={{ maxWidth: 500 }} bordered={true}/>
      </Form.Item>
  ```
  - 首先在return的form中创建description
     ```
     <Descriptions
        title={<h1 style={{ textAlign: 'center', fontSize: 30 }}>软件项目委托测试申请书</h1>}
        layout='vertical'
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >  </Descriptions>
     ```
     - 其中title为这个Description的名字，这里可以直接用"软件项目委托测试申请书"这样的格式，也可以通过h1等方式给名字设定字号大小等属性来显示。
     - layout属性可以根据表格实际的显示效果来设定，不设定该属性时默认是水平排放，设定之后则为竖直排放
    (这里的水平和竖直并不是指Description里的item的排放方式而是item的label和它的内容的排放方式)
     - bordered是边框属性，不设定则不存在边框，反之则会用边框
       - 注：边框的设定除了会影响边框之外对整个Description的整体的布局也会有影响，自身设计时可以根据实际情况来设计
     
   - 之后我们就可以在这个Description里创建item来存放表格的各个属性，如上面的软件名称就可以通过以下方式实现，此处的label为该item在表格中的名字
   ```
   <Descriptions.Item label="软件名称" >
      <Form.Item
        name="软件名称"
        rules={[{ required: true, message: '请填写软件名称' }]}
      >

        <Input id="软件名称" style={{ maxWidth: 500 }} bordered={true}/>
      </Form.Item>
      </Descriptions.Item>
   ```
- 关于Description的一些提醒
  - 就目前的使用看来一个Description会自动根据当前的屏幕尺寸对其内的item进行布局，及每行有多少个item是设定好的，但我们也可以设定span参数来改变，如表格本身每行显示3个item，但我们对软件名称如此设定，那么此时软件名称对应的item会占据一行中的两格。
    ```
    <Descriptions.Item label="软件名称" span={2}>
    ```
  - 在表格中某个表项内我们可以使用
    ```
    <br></br>
    ```
    进行换行
  - 如果需要在Description里实现嵌套的关系,可以考虑在Description.item里再创建一个Description来实现。
  注：此时可能尤其需要考虑边框和layout的属性对显示的影响。

# 将多选或者单选改成下拉栏的方式显示
## 使用antd的Select来实现
- 同样需要加入对Select的引用
  ```
  import { Select } from 'antd';
  ```
- Select的实现方式
  ```
  <Select id="测试类型_下拉栏" mode="multiple" allowClear style={{ width: 160 }} onChange={(e) => {test(e,'测试类型(其他)')}}>
          <Option id="测试类型_软件确认测试" value="软件确认测试" style={{ lineHeight: '32px' }}>软件确认测试</Option>
          <Option id="测试类型_成果/技术鉴定测试" value="成果/技术鉴定测试" style={{ lineHeight: '32px' }}>成果/技术鉴定测试</Option>
          <Option id="测试类型_专项资金验收测试" value="专项资金验收测试" style={{ lineHeight: '32px' }}>专项资金验收测试</Option>
          <Option id="测试类型_其他" value="其他" style={{ lineHeight: '32px' }} >其他</Option>
          
        </Select>
  ```
  Option对应了每个选项，这里的value和之前一样即可
  - mode属性，这里不设置该属性则Select为单选，设定multiple之后则为多选。
  - allowClear属性设定之后可以直接在Select的框里直接点击清除单个选择或者所有选择(单选则没有设定的必要，多选可以考虑)
  - onChange与之前不同（如果你的单选或者多选中不需要填其他的具体内容则可以不用设置onChange）
  之前单多选是直接在“其他”里设置onChange即可，Select在一番尝试之后发现似乎行不通，所以直接总的设置onChange，这里的test的实现方式如下，可以直接使用
  ```
  const test =(value,key)=>{
    setFormData(prev => {
      const newFormData = _.cloneDeep(prev)
      newFormData[key] = false;
      value.map(item => (item==="其他"?
      newFormData[key] = true:
      null))
      console.log(newFormData)
      return newFormData;
    })
    console.log(`selected ${value}`);
  }
  ```
  这里的key根据你最终的数据结构来传参，如我这里想最终将其他的内容存在键“测试类型(其他)”中，就将该键传进去即可。
  - 填其他内容的文本框的放置
  代码实现与之前类似，不过也可以参照我这里，当没选中其他时不显示（毕竟这样看着比较好一点）
  ```
  <Form.Item
    style={{ paddingLeft: 20 }}
    name="测试类型(其他)"
    rules={[{ required: (formData['测试类型(其他)'] === true), message: '请填写其他测试类型名称！' }]}
  >
    {formData['测试类型(其他)'] != true? null:(
        <Input id="测试类型(其他)" style={{ padding: 0 }} disabled={formData['测试类型(其他)'] != true} />
    )}
    
  </Form.Item>
  ```
  这里该代码需要和对应的Select放在同一个Description.item内，但是注意不能和之前一样，放在Select里，需要放在Select下面。

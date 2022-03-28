import {Component} from 'react'

const Action = props => {
  console.log(props)
  return (
    <div>
      <button type='button' onClick={props.editCb}>{props.tr.edit
          ? '保存'
          : '编辑'}</button>
      <button type='button' onClick={props.tr.edit? props.saveCb: Number}>取消</button>
    </div>
  );
};
class Table extends Component {
  constructor(props, context) {
    this.state = {
      headers: {
        name: "名称",
        path: "路径映射",
        action: ""
      },
      trs: [
        {
          name: "定时任务",
          path: "/xxxx",
          action: "",
          edit: false
        }, {
          name: "定时任务2",
          path: "/yyyy",
          action: "",
          edit: false
        }
      ]
    };
  }

  render() {
    var headers = this.state.headers || {};
    var keys = Object.keys(headers);
    console.log(headers);
    return (
      <table>
        <thead>
          <tr>
            {keys.map(key => <th>
              {headers[key]}
            </th>)}
          </tr>
        </thead>
        <tbody>
          {this
            .state
            .trs
            .map(function (tr) {
              return (
                <tr>
                  {keys
                    .map(function (key, index) {
                      return (
                        <td key={key}>
                          {key === "action"
                            ? <Action
                                tr={tr}
                                saveCb={this
                                .onSave
                                .bind(this, tr)}
                                editCb={this
                                .onEdit
                                .bind(this, tr)}/>
                            : tr[key]
}
                        </td>
                      )
                    }, this)}
                </tr>
              )
            }, this)}
        </tbody>
      </table>
    )
  }
}


export default Table
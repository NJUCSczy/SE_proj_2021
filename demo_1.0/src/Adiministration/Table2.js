import React, {Component} from 'react'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>委托单位(中文)</th>
        <th>软件名称</th>
        <th>测试类型</th>
        <th>Delete</th>
      </tr>
    </thead>
  );
}

const TableBody = props => { 
  const rows = props.characterData.map((row, index) => {
      return (
          <tr key={index}>
              <td>{row["委托单位(中文)"]}</td>
              <td>{row.软件名称}</td>
              <td>{row.测试类型.map(item=>(<td key={item}> {item}</td>))}</td>
              <td>
                <button onClick={() => props.removeCharacter(index)}>Delete</button>
              </td>
          </tr>
      );
  });

  return <tbody>{rows}</tbody>;
}

const Table2 = (props) => {
  const { characterData, removeCharacter} = props;
      return (
          <table>
              <TableHeader />
              <TableBody characterData={characterData} removeCharacter={removeCharacter}/>
          </table>
      );
}

export default Table2;
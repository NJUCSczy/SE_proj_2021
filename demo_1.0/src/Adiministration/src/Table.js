import React, {Component} from 'react'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>委托单位(中文)</th>
        <th>软件名称</th>
        <th>测试类型</th>
        <th>Delete</th>
        <th>Accept</th>
      </tr>
    </thead>
  );
}

const TableBody = props => { 
  const rows = props.characterData.map((row, index) => {
      return (
          <tr key={index}>
              <td>{row.名字}</td>
              <td>{row.software}</td>
              <td>{row.测试类型.map(item=>(<td key={item}> {item}</td>))}</td>
              
              <td>
                <button onClick={() => props.removeCharacter(index)}>Delete</button>
              </td>
              <td>
                <button onClick={() => props.acceptCharacter(index)}>Accept</button>
              </td>
          </tr>
      );
  });

  return <tbody>{rows}</tbody>;
}

const Table = (props) => {
  const { characterData, removeCharacter,acceptCharacter} = props;
      return (
          <table>
              <TableHeader />
              <TableBody characterData={characterData} removeCharacter={removeCharacter} acceptCharacter={acceptCharacter}/>
          </table>
      );
}

export default Table;
import React, {Component} from 'react'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Software</th>
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
              <td>{row.name}</td>
              <td>{row.software}</td>
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
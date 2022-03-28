import React, {Component} from 'react'

class Table extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>gender</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Charlie  h  </td>
            <td>Janitor    </td>
            <td>M</td>
          </tr>
          <tr>
            <td>Mac    </td>
            <td>Bouncer    </td>
            <td>M</td>
          </tr>
          <tr>
            <td>Dee    </td>
            <td>Aspiring actress    </td>
            <td>FM</td>
          </tr>
          <tr>
            <td>Dennis    </td>
            <td>Bartender    </td>
            <td>FM</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default Table
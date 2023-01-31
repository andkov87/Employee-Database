import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees,sortByFirstName, sortByMiddlename, sortPosition, sortLevel, onDelete  }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name
            <button onClick={sortByFirstName}>Sort By Firstname</button>
            <button onClick={sortByMiddlename}>Sort By Middlename</button>
          </th>
          <th>Level <input onChange={e => sortLevel(e)}></input></th>
          <th>Position <input onChange={e => sortPosition(e)}></input></th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
              <Link to={`/update/${employee._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;

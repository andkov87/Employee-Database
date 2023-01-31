import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, checked, handleCheck, onDelete, showMissing, sortByMiddlename, sortByLevel, sortByPosition, sortByFirstname, sortByLastname }) => (
  <div className="EmployeeTable">
    <table>
      <thead>
        <tr>
          <th>Name
            <button onClick={sortByFirstname}>Sort By Firstname</button>
            <button onClick={sortByMiddlename}>Sort By Middle Name</button>
            <button onClick={sortByLastname}>Sort By Lastname</button>
            </th>
          <th>Level<button onClick={sortByLevel}>Sort By Level</button></th>
          <th>Position<button onClick={sortByPosition}>Sort By Position</button></th>
          <button onClick={showMissing}>Show Who's Missing</button>
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
              <label>
                Present:
                <input
                  type="checkbox"
                  checked={employee.present}
                  onChange={() => handleCheck(employee)}
                  />
              </label>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;

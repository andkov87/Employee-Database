import { Link } from "react-router-dom";
import "./EquipmentTable.css";

const EquipmentTable = ({ equipment, toDelete }) => (
  <div className="EquipmentTable">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Amount</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {equipment.map((equipment) => (
          <tr key={equipment._id}>
            <td>{equipment.name}</td>
            <td>{equipment.type}</td>
            <td>{equipment.amount}</td>
            <td>
              <Link to={`/updateEq/${equipment._id}`}>
                <button type="button">Update</button>
              </Link>
              <button type="button" onClick={() => toDelete(equipment._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EquipmentTable;
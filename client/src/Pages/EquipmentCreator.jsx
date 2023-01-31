import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm/EquipmentForm";

const createEquipment = (equipment) => {
  return fetch("/api/equipment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const EquipmentCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEquipment = (employee) => {
    setLoading(true);

    createEquipment(employee)
      .then(() => {
        navigate("/equipment");
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <EquipmentForm
      onCancel={() => navigate("/equipment")}
      disabled={loading}
      onSave={handleCreateEquipment}
    />
  );
};

export default EquipmentCreator;
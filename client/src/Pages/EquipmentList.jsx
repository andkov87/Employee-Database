import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable/EquipmentTable";

const fechEquipment = (signal) => {
    return fetch("/api/equipment", { signal }).then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const toDelete = (id) => {
        deleteEquipment(id).catch((err) =>{
            console.log(err)
        });

        setData((equipment) => {
            return equipment.filter((equipment) => equipment._id !== id);
        })
    };

    useEffect(() => {
        const controller = new AbortController();

        fechEquipment(controller.signal)
            .then((equipment) => {
                setLoading(false);
                setData(equipment);
            })
            .catch((error) => {
                if(error.name !== "AbortError") {
                    setData(null);
                    throw error;
                }
            });
        return () => controller.abort();
    }, []);

    if(loading) {
        return <Loading />;
    }
    
    return <EquipmentTable equipment={data} toDelete={toDelete}/>
}

export default EquipmentList;
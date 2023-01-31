import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal }).then((res) => res.json());
};

const fetchEmployeesByLevel = (query) => {
  return fetch(`/api/employees/level/search?search=${query}`, {})
    .then(res => res.json())
};

const fetchEmployeesByFirstname = () => {
  return fetch("/api/employees/firstname", {})
    .then(res => res.json());
};

const fetchEmployeesByMiddlename = () => {
  return fetch("/api/employees/middlename", {})
    .then(res => res.json())
};

const fetchEmployeesByLastname = () => {
  return fetch("/api/employees/lastname", {})
    .then(res => res.json())
}

const fetchEmployeesByPosition = (query) => {
  return fetch(`/api/employees/position/search?search=${query}`, {})
    .then(res => res.json());
}

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const sortLevel = (e) => {
    fetchEmployeesByLevel(e.target.value)
      .then((data) => {
        setData(data)
      })
      .catch((err) => {
        throw err;
      })
  }

  const sortPosition = (e) => {
    fetchEmployeesByPosition(e.target.value)
      .then(data => {
        setData(data);
      })
      .catch(err => {
        throw err;
      })
  }

  const sortByFirstName = () => {
    fetchEmployeesByFirstname()
      .then(data => {
        setData(data)
      })
  };

  const sortByMiddlename = () => {
    fetchEmployeesByMiddlename()
      .then(data => {
        setData(data)
      })
  };

  const sortByLastname = () => {
    fetchEmployeesByLastname()
      .then(data => {
        setData(data)
      })
  }
  
  useEffect(() => {
    const controller = new AbortController();

    fetchEmployees(controller.signal)
      .then((employees) => {
        setLoading(false);
        setData(employees);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable  
          employees={data} 
          updateEmployee={updateEmployee} 
          onDelete={handleDelete} 
          sortLevel={sortLevel}
          sortPosition={sortPosition}
          sortByFirstName={sortByFirstName}
          sortByMiddlename={sortByMiddlename}
          sortByLastname={sortByLastname}
        />;
};

export default EmployeeList;

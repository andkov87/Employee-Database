import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (signal) => {
  return fetch("/api/employees", { signal }).then((res) => res.json());
};

const fetchLevelSortedEmployees = () => {
  return fetch("/api/employees/level").then(res => res.json());
};

const fetchPositionSortedEmployees = () => {
  return fetch("/api/employees/position").then(res => res.json());
}

const fetchFirstnameSortedEmployees = () => {
  return fetch("/api/employees/firstname").then(res => res.json());
}

const fetchMiddlenameSortedEmployees = () => {
  return  fetch("/api/employees/middlename").then(res => res.json());
}

const fetchLastnameSortedEmployees = () => {
  return fetch("/api/employees/lastname").then(res => res.json());
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

const fetchMissing = () => {
  return fetch('/api/missing').then((res) => res.json())
}

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [check, setCheck] = useState(null)

  const handleDelete = (id) => {
    deleteEmployee(id).catch((err) => {
      console.log(err);
    });

    setData((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const sortByLevel = () => {
    fetchLevelSortedEmployees()
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
  }

  const sortByFirstname = () => {
    fetchFirstnameSortedEmployees()
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
  }

  const sortByMiddlename = () => {
    fetchMiddlenameSortedEmployees()
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
  }

  const sortByLastname = () => {
    fetchLastnameSortedEmployees()
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
  }

  const sortByPosition = () => {
      fetchPositionSortedEmployees()
        .then((employees) => {
          setLoading(false)
          setData(employees)
        })
        .catch((error) => {
          if (error.name !== "AbortError") {
            setData(null);
            throw error;
          }
        });
    }

    const handleCheck = (employee) => {
      if(employee.present === false) {
        employee.present = true;
      } else {
       employee.present = false;
      }
      
      updateEmployee(employee)
      .then(() => {
        console.log('employee presence updated')
        setCheck(employee.present)
      })
      .catch((error) => {
        throw error;
      })
    }
  
    const showMissing = () => {
      fetchMissing()
        .then((employees) => {
          setLoading(false)
          setData(employees)
        })
        .catch((error) => {
          if (error.name !== "Abort Error") {
            setData(null);
            throw error;
          }
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

  return <EmployeeTable handleCheck={handleCheck} employees={data} showMissing={showMissing} sortByMiddlename={sortByMiddlename} sortByFirstname={sortByFirstname} sortByLastname={sortByLastname} sortByPosition={sortByPosition} sortByLevel={sortByLevel} onDelete={handleDelete} />;
};

export default EmployeeList;

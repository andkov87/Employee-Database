require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const cors = require('cors');

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(cors());

app.patch("/api/equipment/:id", async (req, res, next) => {
  const equipment = req.body;

  EquipmentModel.findByIdAndUpdate(req.params.id, equipment, {new: true }).then((equipment) => {
    if(!equipment) {  
      return res.status(404).send(`equipment doesn't exist`)
    }
    res.send(equipment)
  }).catch(error => {
    res.status(500).send(error)
  })
})

app.delete("/api/equipment/:id", async (req, res, next) => {
  let equipment = await EquipmentModel.findByIdAndDelete(req.params.id);
  return res.send({"deleted": equipment});
});

app.get("/api/employees", async (req, res) => {
  const employees = await EmployeeModel.find().sort({ created: "desc" });
  return res.json(employees);
});

app.get("/api/employees/level/search", async (req, res) => {
  const query = req.query.search;

  const sortedEmployees = await EmployeeModel.find({ level: {$regex: `^${query}`, $options: "i"}})
  return res.json(sortedEmployees);
})

app.get("/api/employees/position/search", async (req, res) => {
  const query = req.query.search;

  const sortedEmployees = await EmployeeModel.find({ position: { $regex: `^${query}`, $options: "i"}})
  return res.json(sortedEmployees);
})

app.get("/roberts", async (req, res) => {
  const foundRoberts = await EmployeeModel.find({ name: { $regex: 'Robert'}})
  return res.json(foundRoberts)
})

app.get("/api/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id)
  return res.json(employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = req.body;

  await EmployeeModel.findByIdAndUpdate(employee._id, employee, {new: true }).then((employee) => {
    if(!employee) {  
      return res.status(404).send(`Employee doesn't exist`)
    }
    res.send(employee)
  }).catch(error => {
    res.status(500).send(error)
  })
});

app.delete("/api/employees/:id", async (req, res, next) => {
  const employee = await EmployeeModel.findByIdAndDelete(req.params.id);
  return res.send({"deleted": employee})
});

const main = async () => {
  await mongoose.set("strictQuery", false);
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

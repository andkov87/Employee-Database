const {Router} = require('express');
const EquipmentModel = require('../db/equipment.model')

const EquipmentRouter = new Router();

EquipmentRouter.get("/", async (req, res) => {
    const equipment = await EquipmentModel.find();
    return res.json(equipment);
})

module.exports = EquipmentRouter;


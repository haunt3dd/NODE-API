module.exports = (app) =>{
    const vehicleController = require("../controllers/VehicleController");

    app.get("/vehicle",vehicleController.readVehicle);
    app.post("/vehicle",vehicleController.create);
}
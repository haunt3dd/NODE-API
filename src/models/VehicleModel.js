const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    vehicleType: { type: String, required: true},
    vehicleWheel:{ type: Number, required:true},
    vehicleSpeed:{ type: Number,required:true},
});

module.exports = mongoose.model("Vehicle",vehicleSchema);
module.exports = (app) =>{
    const authController = require("../controllers/AuthController");

    app.post("/token",authController.createToken);
}
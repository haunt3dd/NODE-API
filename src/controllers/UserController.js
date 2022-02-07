const User = require("../models/UserModel");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        accountNumber: req.body.accountNumber,
        identityNumber: uuid.v4(),
    })

    user.save((error, document) => {
        if (error) {
            return res.status(500).send({
                status: 500,
                message: "Cant Register User",
                Exception: error,
            });
        }

        return res.status(200).send({
            status: 200,
            message: `Create user with username ${user.username} Sucessfully`,
        });
    });
};

exports.read = (req, res) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).send({
            status: 400,
            message: "Token not Available",
        })
    }

    jwt.verify(token, process.env.API_KEY, function (err, decoded) {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: "Failed to authenticate token."
            });
        }
    });

    User.find((error, document) => {
        if (error) {
            return res.status(500).send({
                status: 500,
                message: "Failed to find user",
                Exception: error,
            });
        }

        return res.status(200).send({
            status: 200,
            message: `users found`,
            data: document,
        });
    });
};

exports.readbyAccountNumber = (req, res) => {

    let param = {
        accountNumber: req.params.accountNumber
    }

    User.findOne(param, (error, document) => {
        if (!document) {
            return res.status(500).send({
                status: 500,
                message: "User Not Found",
            });
        }

        if (error) {
            return res.status(500).send({
                status: 500,
                message: "Failed to find User",
                Exception: error,
            });
        }

        return res.status(200).send({
            status: 200,
            message: `user found`,
            data: document,
        });
    });
};

exports.readbyIdentityNumber = (req, res) => {

    let param = {
        identityNumber: req.params.identityNumber,
    }


    User.findOne(param, (error, document) => {
        if (!document) {
            return res.status(500).send({
                status: 500,
                message: "User Not Found",
            });
        }

        if (error) {
            return res.status(500).send({
                status: 500,
                message: "Failed to find User",
                Exception: error,
            });
        }

        return res.status(200).send({
            status: 200,
            message: `user found`,
            data: document,
        });
    });
};


exports.update = (req, res) => {

    let param = {
        _id: req.params.id
    }

    let body = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        accountNumber: req.body.accountNumber,
    }

    User.findByIdAndUpdate(param, body, (error, document) => {
        if (!document) {
            return res.status(500).send({
                status: 500,
                message: "User Not Found",
            });
        }

        if (error) {
            return res.status(500).send({
                status: 500,
                message: "Failed to find User",
                Exception: error,
            });
        }

        return res.status(200).send({
            status: 200,
            message: `user updated`,
            data: document,
        });
    });
};

exports.delete = (req, res) => {

    let param = {
        _id: req.params.id
    }


    User.findByIdAndDelete(param, (error, document) => {
        if (!document) {
            return res.status(500).send({
                status: 500,
                message: "User Not Found",
            });
        }

        if (error) {
            return res.status(500).send({
                status: 500,
                message: "Failed to find User",
                Exception: error,
            });
        }

        return res.status(200).send({
            status: 200,
            message: `user deleted`,
            data: document,
        });
    });
};
import express from "express";
import Validator from "fastest-validator";
import mongoose from 'mongoose';
import '../database/index.js';
import { POST_SCHEMA, GET_SCHEMA, PUT_SCHEMA, DELETE_SCHEMA } from "./schemas.js";

const Router = express.Router();
const User = mongoose.model("User");
const v = new Validator();

Router.post("/", (req, res) => {

    // Throw an error if the request body is not matching with the required schema 
    if (v.validate(req.body, POST_SCHEMA) != true) {
        return res.status(500).send("Invalid request");
    }

    let user = new User(req.body);

    user.save().then((result) => {
        return res.status(200).send(result);
    }).catch((error) => {
        return res.status(500).send(error);
    })
});

Router.get("/", (req, res) => {
    // Throw an error if the request body is not matching with the required schema 
    if (v.validate(req.body, GET_SCHEMA) != true) {
        return res.status(500).send("Invalid request");
    }

    // Find user by ID. We need to convert the ID String from the request to ObjectID Type
    User.findById(mongoose.Types.ObjectId(req.body.id)).then((result) => {
        if (!result) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send(result);
    }).catch((error) => {
        return res.status(500).send(error);
    });
});

Router.put("/", (req, res) => {
    // Throw an error if the request body is not matching with the required schema 
    if (v.validate(req.body, PUT_SCHEMA) != true) {
        return res.status(500).send("Invalid request");
    }

    if (v.validate(req.body.data, POST_SCHEMA) != true) {
        return res.status(500).send("Invalid request");
    }

    // Find user by ID. We need to convert the ID String from the request to ObjectID Type
    User.findById(mongoose.Types.ObjectId(req.body.id)).then(async (result) => {
        if (!result) {
            return res.status(404).send("User not found");
        }

        // Update the user with data from req.body.data
        User.updateOne({ _id: result._id }, req.body.data).then((e) => {

            // Find and return the updated user
            User.findById(mongoose.Types.ObjectId(req.body.id)).then((result) => {
                return res.status(200).send(result);
            });
        });
    }).catch((error) => {
        return res.status(500).send(error);
    });
});

Router.delete("/", (req, res) => {
    // Throw an error if the request body is not matching with the required schema 
    if (v.validate(req.body, DELETE_SCHEMA) != true) {
        return res.status(500).send("Invalid request");
    }

    User.findById(mongoose.Types.ObjectId(req.body.id)).then((result) => {
        result.remove();
        return res.status(200).send("OK");
    });
});

export default Router;
import express from "express";
import Validator from "fastest-validator";
import mongoose from 'mongoose';
import '../database/index.js';
import { POST_SCHEMA } from "./schemas.js";

const Router = express.Router();
const User = mongoose.model("User");
const v = new Validator();

// POST request to /api/
// Schema.js -> POST_SCHEMA must be provided in request body
// -- 200 if email already exists in database -- 
// -- 201 if user is created -- 
// -- 500 if any error occured -- 
Router.post("/", async (req, res) => {

    // Throw an error if the request body is not matching with the required schema 
    if (v.validate(req.body, POST_SCHEMA) != true) {
        return res.status(500).send("Invalid request");
    }

    // Check if email already exists in the database
    if (await User.exists({ email: req.body.email })) {
        return res.status(200).send("Email alredy exists");
    }


    let user = new User(req.body);

    user.save().then((result) => {
        return res.status(201).send(result);
    }).catch((error) => {
        return res.status(500).send(error);
    })
});

// GET request to /api/
// Return all users from database
Router.get("/", (req, res) => {
    User.find({}).then((result) => {
        return res.status(200).send(result);
    }).catch((error) => {
        return res.status(500).send(error);
    })
});

// GET request to /api/ID
// Return an user based on the provided ID (ex: /api/62c9a3acb886fe37acc8d8c1)
// -- 200 if user found, returns the user data -- 
// -- 404 if user not found -- 
// -- 500 if any error occured -- 
Router.get("/:id", (req, res) => {
    // Throw an error if id is not provided
    if (!req.params.id) {
        return res.status(500).send("Invalid request");
    }

    // Find user by ID. We need to convert the ID String from the request to ObjectID Type
    User.findById(mongoose.Types.ObjectId(req.params.id)).then((result) => {
        if (!result) {
            return res.status(404).send("User not found");
        }

        return res.status(200).send(result);
    }).catch((error) => {
        return res.status(500).send(error);
    });
});

// PUT request to /api/ID
// Edit user from database based on the provided ID (ex: /api/62c9a3acb886fe37acc8d8c1)
// Schema.js -> POST_SCHEMA must be provided in request body
// -- 200 if changes have been applied, returns the user data -- 
// -- 404 if user not found -- 
// -- 500 if any error occured -- 
Router.put("/:id", (req, res) => {
    // Throw an error if the request body is not matching with the required schema or if id is not provided
    if (!req.params.id) {
        return res.status(500).send("Invalid request");
    }

    if (v.validate(req.body, POST_SCHEMA) != true) {
        return res.status(500).send("Invalid request");
    }

    // Find user by ID. We need to convert the ID String from the request to ObjectID Type
    User.findById(mongoose.Types.ObjectId(req.params.id)).then(async (result) => {
        if (!result) {
            return res.status(404).send("User not found");
        }

        // Update the user with data from req.body.data
        User.updateOne({ _id: result._id }, req.body).then((e) => {

            // Find and return the updated user
            User.findById(mongoose.Types.ObjectId(req.params.id)).then((result) => {
                return res.status(200).send(result);
            });
        });
    }).catch((error) => {
        return res.status(500).send(error);
    });
});

// DELETE request to /api/ID
// Delte an user based on the provided ID (ex: /api/62c9a3acb886fe37acc8d8c1)
// -- 200 if user is deleted -- 
// -- 404 if user not found -- 
// -- 500 if any error occured -- 
Router.delete("/:id", (req, res) => {
    // Throw an error if id is not provided
    if (!req.params.id) {
        return res.status(500).send("Invalid request");
    }

    User.findById(mongoose.Types.ObjectId(req.params.id)).then((result) => {
        if (!result) {
            return res.status(404).send("User not found");
        }

        result.remove();
        return res.status(200).send("OK");
    }).catch((error) => {
        return res.status(500).send(error);
    });
});

export default Router;
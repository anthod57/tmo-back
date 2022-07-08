import express from "express";
import Validator from "fastest-validator";
import mongoose from 'mongoose';
import '../database/index.js';
import { POST_SCHEMA, GET_SCHEMA, PUT_SCHEMA, DELETE_SCHEMA } from "./schemas.js";

const Router = express.Router();
const User = mongoose.model("User");
const v = new Validator();

Router.post("/", (req, res) => {

    //Throw an error if the request body is not matching with the required schema 
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

Rouger.get("/", (req, res) => {

});

export default Router;
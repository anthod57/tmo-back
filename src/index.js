import Router from "./api/routes.js";
import express from "express";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use("/api/", Router);

app.listen(PORT, () => console.log(`[EXPRESS] Starting server on port: ${PORT}.`));
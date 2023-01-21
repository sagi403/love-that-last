import express from "express";
import { keys } from "../keys.js";

const router = express.Router();

router.get("/paypal", (req, res) => res.send(keys.paypalClientId));

export default router;

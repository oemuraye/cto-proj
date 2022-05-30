import express from 'express'
import { postReading, getCurrent, getEnergy, getPower, getvoltage } from "../controllers/posts.js";

const router = express.Router();

router.get('/', postReading)
router.get('/current', getCurrent)
router.get('/voltage', getvoltage)
router.get('/power', getPower)
router.get('/energy', getEnergy)

export default router;
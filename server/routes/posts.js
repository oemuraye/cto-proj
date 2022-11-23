import express from 'express'
import { postReading, getCurrent, getEnergy, getPower, getvoltage, getAllReading, getDbExcel } from "../controllers/posts.js";

const router = express.Router();

router.get('/', postReading)
router.get('/readings', getAllReading)
router.get('/current', getCurrent)
router.get('/voltage', getvoltage)
router.get('/power', getPower)
router.get('/energy', getEnergy)
router.get('/downloadExcel', getDbExcel)

export default router;
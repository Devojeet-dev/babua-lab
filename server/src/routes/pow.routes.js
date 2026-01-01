import { addPow, getPow } from '../controllers/pow.controller.js'
import {verifyJWT} from '../middleware/verifyJWT.js'
import express from 'express'

const powRouter = express.Router()

powRouter.post('/add', verifyJWT, addPow)
powRouter.get('/get', verifyJWT, getPow)

export default powRouter

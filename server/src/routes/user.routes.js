import express from 'express'
import { getUser,updateUser } from '../controllers/user.controller.js'
import {verifyJWT} from '../middleware/verifyJWT.js'

const UserRoute = express.Router()

UserRoute.get('/get-user', verifyJWT, getUser)
UserRoute.put('/update-user', verifyJWT, updateUser)

export default UserRoute
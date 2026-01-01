import express from 'express'
import { Login, Register, Logout } from '../controllers/auth.controller.js'

const AuthRoute = express.Router()

AuthRoute.post('/register', Register)
AuthRoute.post('/login', Login)
AuthRoute.post('/logout', Logout)

export default AuthRoute
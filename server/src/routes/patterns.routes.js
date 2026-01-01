import express from 'express';
import { getPatterns, getPatternBySlug, seedPatterns, masterPattern } from '../controllers/patterns.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';

const patternRouter = express.Router();

patternRouter.get('/', verifyJWT, getPatterns);
patternRouter.get('/seed', seedPatterns); // Dev only, maybe protect later
patternRouter.get('/:slug', verifyJWT, getPatternBySlug);
patternRouter.post('/:slug/master', verifyJWT, masterPattern);

export default patternRouter;

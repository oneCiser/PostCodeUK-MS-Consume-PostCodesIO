import { Router } from 'express';
import APIRouter from './api.route';

const router = Router();
const prefix: string = '/api';

router.use(`${prefix}/postcodes`, APIRouter);

export default router;

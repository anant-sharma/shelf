/**
 * Import Dependencies
 */
import * as express from 'express';

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Import Routes
 */
import clockRouter from './clock/router';
import shelfRouter from './shelf/router';

/**
 * Bind Routes
 */
router.use('/clock', clockRouter);
router.use('/shelf', shelfRouter);

/**
 * Export Module
 */
export default router;

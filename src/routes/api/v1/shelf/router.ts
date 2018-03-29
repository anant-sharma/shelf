/**
 * Import Dependencies
 */
import * as express from 'express';
import { existsSync } from 'fs';
import * as multer from 'multer';
import { v4 as uuid } from 'uuid';
import { uploads } from '../../../../config/config';

/**
 * Initialize Router
 */
const router = express.Router();

/**
 * Initialize multer uploader middleware
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploads.directory);
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        let extn = '';
        try {
            const fileNameSplit = originalname.split('.');
            extn = fileNameSplit[fileNameSplit.length - 1] || '';
        // tslint:disable-next-line:no-empty
        } catch (e) {}
        if (extn.length) { extn = `.${extn}`; }
        cb(null, `${uuid()}${extn}`);
    },
});
const upload = multer({ storage });

/**
 * Bind Routes
 */

/**
 * Get File by id
 */
router.get('/:id', (req: express.Request, res: express.Response) => {

    /**
     * Get File id from params
     */
    try {
        const { id } = req.params;

        /**
         * Check if file exists
         */
        const filePath = `${uploads.directory}/${id}`;
        if (!existsSync(filePath)) {
            res.status(400).json({
                error: `File not found corresponding to ${id}`,
                status: 'error',
            });
            return;
        }

        /**
         * Send response
         */
        res.status(200).sendFile(filePath);

    } catch (e) {
        res.status(400).json({
            error: e,
            status: 'error',
        });
    }

});

/**
 * Upload file in system
 */
router.put('/', upload.single('file'), (req: express.Request, res: express.Response) => {

    /**
     * Get File Details
     */
    try {
        const { file } = req;

        /**
         * Extract file attributes
         */
        const {
            originalname,
            encoding,
            filename,
            size,
        } = file;

        /**
         * Send response
         */
        res.status(200).json({
            file : {
                encoding,
                filename,
                originalname,
                size,
            },
            status: 'success',
        });

    } catch (e) {
        res.status(400).json({
            error: e,
            status: 'error',
        });
    }

});

/**
 * Export Module
 */
export default router;

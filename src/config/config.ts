/**
 * This file contins the config
 * required to run the app
 */
import { mkdirSync, statSync } from 'fs';
import * as path from 'path';

 /**
  * App Config
  */
export const appConfig =  {
    host: 'http://shelf.chipserver.ml',
    port: 22000,
};

/**
 * Auth Enabled
 */
export const authEnabled = false;

/**
 * DB Connection
 */
export const dbConfig = {
    connectionString: process.env.dbConnectionString || '',
    // connectionString: `mongodb://<username>:<password>@chipserver.ml:27017/fleet-management?authSource=admin`,
};

/**
 * JWT Config
 */
export const jwtConfig = {
    options: {
        algorithm: 'HS256',
        expiresIn: 3600,
        issuer: 'Chipserver',
    },
    secret: 'appsecret',
};

/**
 * Paths
 */
export const paths = {
    whitelisted: [
        '/auth',
    ],
};

/**
 * Uploads
 */
export const uploads = {
    directory: path.resolve('uploads'),
};
// tslint:disable-next-line:no-empty
try { mkdirSync(uploads.directory); } catch (e) {}

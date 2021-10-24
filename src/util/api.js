/**
 * Provides common REST-API functions.
 * @module
 */
import axios from "axios";

const BASE_URL = 'http://localhost:9090/api/';

/**
 * Send a HTTP request with the given parameters to backend and return the response.
 *
 * @param {string} method HTTP method to use. (e.g. 'get')
 * @param {string} api API to call. (e.g. 'subject')
 * @param {string} token Access token for validation.
 * @param {Object}[params={}] Additional params for the request.
 *
 * @return {Promise<any>}
 * - resolves when the backend responds successfully.
 * - rejects with the error when the request was unsuccessful.
 */
export function callAPI(method, api, token, params={}) {
    let logPrefix = `[${method.toUpperCase()}]`;
    let url = BASE_URL + api + '/';
    let fetchPromise;

    params['headers'] = {
        Authorization: 'Bearer ' + token
    };

    switch (method.toUpperCase()) {
        case 'GET':
            fetchPromise = new Promise(((resolve, reject) => {
                axios.get(url, params)
                    .then((response) => resolve(response))
                    .catch((err) => reject(err))
            }));
            break;
        case 'POST':
            fetchPromise = new Promise(((resolve, reject) => {
                axios.post(url, params)
                    .then((response) => resolve(response))
                    .catch((err) => reject(err))
            }));
            break;
        case 'PUT':
            fetchPromise = new Promise(((resolve, reject) => {
                axios.put(url, params)
                    .then((response) => resolve(response))
                    .catch((err) => reject(err))
            }));
            break;
        default:
            fetchPromise = Promise.reject(new Error(`Unknown HTTP method: ${method}`));
            break;
    }
    return fetchPromise
        .then((response) => {
            console.log(`${logPrefix} Backend responded with ${JSON.stringify(response, null, 4)}!`);
            return response;
        }).catch((err) => {
            console.log(`${logPrefix} Error: Request was unsuccessful!: ${err}`);
            return Promise.reject(err);
        });
}

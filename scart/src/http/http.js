import axios from 'axios';
import { CK, CS, BASE_URL } from '../utility/config';
import OAuth from 'oauth-1.0a';
import CryptoJS from 'crypto-js';
import { stringify } from 'query-string';



const axiosInstance = axios.create({
    baseURL: BASE_URL,
});


const hash_function_sha1 = (base_string, key) =>  {
    return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
}


const oauth = OAuth({
    consumer: { key: CK, secret: CS },
    signature_method: 'HMAC-SHA1',
    hash_function: hash_function_sha1
});


const request_data = {
    url: BASE_URL,
    method: 'GET',
    data: {}
};


export const get = (path, data) => {
    request_data.data = { ...data };
    request_data.method = 'GET';
    request_data.url = BASE_URL+path;
    const query = oauth.authorize(request_data);
    const queryString = stringify(query);
    return axiosInstance.get(path + '?' + queryString);
}



export default axiosInstance;


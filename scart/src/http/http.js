import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://projects.thesparxitsolutions.com/react-demo/wp-json/wc/v2/',

});
//axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
export default axiosInstance;


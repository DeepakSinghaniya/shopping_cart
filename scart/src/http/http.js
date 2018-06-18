import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://projects.thesparxitsolutions.com/react-demo/wp-json/wc/v2/',

});
export default axiosInstance;


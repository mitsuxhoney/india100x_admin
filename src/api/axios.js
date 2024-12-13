import axios from 'axios';
const base_url="http://localhost:3000"
axios.defaults.withCredentials=true;
export default axios.create({
    baseURL: `${base_url}`
});
const base_url="http://localhost:3000"

import axios from 'axios';

export default axios.create({
    baseURL: `${base_url}`
});
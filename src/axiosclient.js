import axios from "axios";

const AxiosClient = axios.create({
    baseURL: `https://geminisoftvn.ddns.net:7001`,
    // baseURL: `https://localhost:7001`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default AxiosClient
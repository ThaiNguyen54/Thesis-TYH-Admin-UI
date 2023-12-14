const endpoint = 'shair-engine/ver1'
const authEndpoint = 'shair-engine/ver1/auth'

// const api = {
//     "LOGIN": "https://geminisoftvn.ddns.net:7001/shair-engine/ver1/admin/login",
//     "ADD_HAIR": "https://geminisoftvn.ddns.net:7001/ver1/hairstyle",
//     "UPDATE_HAIR": "https://geminisoftvn.ddns.net:7001/ver1/hairstyle",
//     "DELETE_HAIR": "https://geminisoftvn.ddns.net:7001/ver1/hairstyle",
//     "GENERATE_HAIR": "https://geminisoftvn.ddns.net:7001/ver1/generate_hair",
//     "GET_HAIR": "https://geminisoftvn.ddns.net:7001/ver1/hairstyle",
//     "SET_TRENDING": "https://geminisoftvn.ddns.net:7001/ver1/hairstyle/trending"
// }

const api = {
    "LOGIN": "https://localhost:7001/shair-engine/ver1/admin/login",
    "ADD_HAIR": `https://localhost:7001/${authEndpoint}/hairstyle`,
    "UPDATE_HAIR": `https://localhost:7001/${authEndpoint}/hairstyle`,
    "DELETE_HAIR":`https://localhost:7001/${authEndpoint}/hairstyle`,
    "GENERATE_HAIR": "https://localhost:7001/ver1/generate_hair",
    "GET_HAIR": `https://localhost:7001/${endpoint}/hairstyle`,
    "SET_TRENDING": `https://localhost:7001/${authEndpoint}/hairstyle/trending`,
    "UPDATE_PASS": `https://localhost:7001/${authEndpoint}/admin/pass`,
    "UPDATE_DISPLAYNAME": `https://localhost:7001/${authEndpoint}/admin`,
    "UPDATE_ADMIN": `https://localhost:7001/${authEndpoint}/admin`,
    "DELETE_ADMIN": `https://localhost:7001/${authEndpoint}/admin`,
    "GET_ADMIN": `https://localhost:7001/${authEndpoint}/admin`,
}


export default api
import axios from 'axios'
const baseUrl = 'http://localhost:4999'

const signIn = async (credentials, callback) => {
  const response = await axios.post(`${baseUrl}/login`, credentials, {crossDomain: true})
  if (response.status === 200) {
    console.log("poggers")
    callback(credentials, response.data)
  }
  return response.data
}

const signUp = async (credentials, callback) => {
  const response = await axios.post(`${baseUrl}/register`, credentials, {crossDomain: true})
  if (response.status === 200) {
    console.log("poggers")
    callback(credentials, response.data)
  }
  return response.data
}

const ping = async (token, location) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return await axios.post(`${baseUrl}/ping`, {location_lat: location.locationLat, location_long: location.locationLong}, config);
}

const authServices = { signIn, signUp, ping }

export default authServices
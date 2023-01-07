
import axios from 'axios'

const signIn = async (credentials, callback) => {
  console.log("arrr")
  const response = await axios.post(`${baseUrl}/login/`, credentials)
  if (response.status === 200) {
    callback(credentials, response.data)
  }
  return response.data
}

const signUp = async (credentials, callback) => {
  const response = await axios.post(`${baseUrl}/register/`, credentials)
  if (response.status === 200) {
    callback(credentials, response.data)
  }
  return response.data
}

const authServices = { login, register }

export default authServices
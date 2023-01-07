import axios from 'axios'
const baseUrl = '/api'

const signIn = async (credentials, callback) => {
  const response = await axios.post(`${baseUrl}/signin/`, credentials)
  if (response.status === 200) {
    callback(credentials, response.data)
  }
  return response.data
}

const signUp = async (credentials, callback) => {
  const response = await axios.post(`${baseUrl}/signup/`, credentials)
  if (response.status === 200) {
    callback(credentials, response.data)
  }
  return response.data
}

const authServices = { signIn, signUp }

export default authServices
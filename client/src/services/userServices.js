import axios from 'axios'
const baseUrl = '/api/users'

const getUser = async (userId, username, callback) => {
  const response = await axios.get(`${baseUrl}/${userId}//`, {
    headers: {
      "Authorization": `Token ${token}`
    }
  })
  console.log(response)
  if (response.status === 200) {
    callback(response.data)
  }
  return response.data
}

const updateUser = async (userId, token, updatedUser, callback) => {
  const response = await axios.put(`${baseUrl}/${userId}/`, updatedUser,  {
    headers: {
      "Authorization": `Token ${token}`
    }
  })
  console.log(response)
  if (response.status === 204) {
    callback(response.data)
  }
  return response.status
}

const login = async (credentials, callback) => {
  console.log("arrr")
  const response = await axios.post(`${baseUrl}/login/`, credentials)
  if (response.status === 200) {
    callback(credentials, response.data)
  }
  return response.data
}

const register = async (credentials, callback) => {
  const response = await axios.post(`${baseUrl}/register/`, credentials)
  if (response.status === 200) {
    callback(credentials, response.data)
  }
  return response.data
}

const authServices = { login, register }

export default authServices


const  userService = { getUser, updateUser }

export default userService;

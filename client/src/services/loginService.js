import axios from 'axios'

const baseUrl = '/api/login'
const login = async (credents) => {
  const response = await axios.post(baseUrl, credents)
  return response.data
}
export default login

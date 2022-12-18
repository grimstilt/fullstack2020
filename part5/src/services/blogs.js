import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response
}

const update = async newBlog => {
  const updatedUrl = baseUrl + `/${newBlog.id}`
  const response = await axios.put(updatedUrl, newBlog)
  return response
}

const remove = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const updatedUrl = baseUrl + `/${blog.id}`
  const response = await axios.delete(updatedUrl, config)
  return response
}

export default { getAll, create, update, remove, setToken }
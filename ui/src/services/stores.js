import axios from 'axios'
import { API_URL } from '../config'

export const getStores = async () => {
  try {
    return axios.get(`${API_URL}/stores`, {})
  } catch (error) {
    throw new Error(error)
  }
}

export const getClosestStore = async (lat, lon) => {
    try {
    return axios.get(`${API_URL}/nextStore/?lat=${lat}&lon=${lon}`, {})
  } catch (error) {
    throw new Error(error)
  }
}

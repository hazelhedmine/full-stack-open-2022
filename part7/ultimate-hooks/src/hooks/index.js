import { useEffect, useState } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    getAll()
  }, [baseUrl])

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    getAll()
    console.log('response.data :>> ', response.data)
    console.log('resources :>> ', resources)
  }

  const service = {
    create,
    getAll,
  }

  return [resources, service]
}

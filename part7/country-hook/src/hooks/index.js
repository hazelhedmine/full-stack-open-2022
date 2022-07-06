import { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  console.log('name :>> ', name)
  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((response) => {
        console.log('promise fulfilled')
        setCountry(response.data)
      })
      .catch((error) => {
        console.log('error :>> ', error)
        setCountry(null)
      })
  }, [name])

  console.log('country :>> ', country)

  return { country }
}

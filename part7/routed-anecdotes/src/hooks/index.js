import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  // doesnt cause error cause of onReset
  // if using custom name etc reset
  // then solve by doing
  // <input {...content reset=""}>
  // or
  // const {reset: infoReset, ...info} = useField('info')
  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset,
  }
}

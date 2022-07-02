import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification.message)
  const style = useSelector((state) => state.notification.style)
  return <div style={style}>{notification}</div>
}

export default Notification

// import { useSelector } from 'react-redux'

// const Notification = () => {
//   const notification = useSelector((state) => state.notification.message)
//   const style = useSelector((state) => state.notification.style)
//   return <div style={style}>{notification}</div>
// }

// export default Notification

import { connect } from 'react-redux'

const Notification = (props) => {
  return <div style={props.style}>{props.message}</div>
}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    style: state.notification.style,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification

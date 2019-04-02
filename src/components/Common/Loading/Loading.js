import React from 'react'
import { loading } from '@constants/constants'
const styles = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 'auto',
  width: '284px',
  height: '172px',
  textAlign: 'center',
  color: '#000000',
  opacity: 0.2,
  background: `url(${loading}) no-repeat center center`
}
export default () => {
  return <figure style={styles} />
}

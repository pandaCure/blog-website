import React, { Fragment, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
function AutoBackToTop (props) {
  const isMounted = useRef(true)
  useEffect(() => {
    if (isMounted) {
      isMounted.current = false
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [props.location.pathname])
  return <Fragment>{props.children}</Fragment>
}

export default withRouter(AutoBackToTop)

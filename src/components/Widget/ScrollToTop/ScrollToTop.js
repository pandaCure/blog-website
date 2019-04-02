import React, { useRef, useEffect, useCallback } from 'react'
import _ from 'lodash'
import styles from './ScrollToTop.module.scss'
const scrollToTop = () => {
  let timer = 0
  cancelAnimationFrame(timer)
  const startTime = +new Date()
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const time = 500
  const copyScrollTop = scrollTop
  timer = requestAnimationFrame(function func () {
    const t = time - Math.max(0, startTime - +new Date() + time)
    document.documentElement.scrollTop = document.body.scrollTop = (t * -copyScrollTop) / time + scrollTop
    timer = requestAnimationFrame(func)
    if (t === time) {
      cancelAnimationFrame(timer)
    }
  })
}
function ScrollToTop () {
  const backToTop = useRef(null)
  const handlePosition = useCallback(() => {
    const backToTops = backToTop.current
    if (backToTops) {
      window.addEventListener(
        'scroll',
        _.throttle(() => {
          const tops =
            document.documentElement.scrollTop || document.body.scrollTop
          if (tops > 100) {
            backToTops.style.top = '-10rem'
          } else {
            backToTops.style.top = '-60rem'
          }
        }, 150)
      )
    }
  })
  useEffect(() => {
    handlePosition()
  }, [handlePosition])
  return (
    <div
      className={styles.back_to_top}
      onClick={scrollToTop}
      ref={backToTop}
    />
  )
}

export default ScrollToTop

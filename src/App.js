import React, { memo } from 'react'
import { Provider } from 'mobx-react'
import { Router, Switch } from 'react-router-dom'
import ReactGA from 'react-ga'
import { checkWebp } from '@tools/tools'
import { GA } from '@constants/constants'
import AutoBackToTop from '@components/Common/AutoBackToTop/AutoBackToTop'
import history from '@tools/history'
import Layouts from './layouts/Layouts'
import stores from './stores/index'
import '@assets/styles/global.scss'
const reactGA = () => {
  ReactGA.initialize(GA)
  ReactGA.pageview(window.location.pathname + window.location.search)
  history.listen(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  })
}
const devToolsWarning = () => {
  document.addEventListener('DOMContentLoaded', () => {
    if (window.console || 'console' in window) {
      console.log(
        `
        █████▒█    ██  ▄████▄   ██ ▄█▀       ██████╗ ██╗   ██╗ ██████╗
        ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒        ██╔══██╗██║   ██║██╔════╝
        ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░        ██████╔╝██║   ██║██║  ███╗
        ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄        ██╔══██╗██║   ██║██║   ██║
        ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄       ██████╔╝╚██████╔╝╚██████╔╝
         ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒       ╚═════╝  ╚═════╝  ╚═════╝
         ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
         ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
                  ░     ░ ░      ░  ░
                        ░
        `
      )
    }
  })
}
function Home () {
  window.location.isWebp = checkWebp()
  reactGA()
  devToolsWarning()
  return (
    <Provider {...stores}>
      <Router history={history}>
        <AutoBackToTop>
          <Switch>
            <Layouts />
          </Switch>
        </AutoBackToTop>
      </Router>
    </Provider>
  )
}

const App = memo(Home)

export default App

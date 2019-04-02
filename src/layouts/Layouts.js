import React, { Component, Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import history from '@tools/history'
import styles from './Layouts.module.scss'
import Header from '@components/Common/Header/Header'
import Footer from '@components/Common/Footer/Footer'
import ScrollToTop from '@components/Widget/ScrollToTop/ScrollToTop'
import Player from '@components/Widget/Player/Player'
import { inject, observer } from 'mobx-react'
import routePath from '@constants/routePath'
import Loading from '@components/Common/Loading/Loading'
const Home = lazy(() => import('../containers/Home/Home'))
@inject('layoutsStore')
@observer
class Layouts extends Component {
  state = {}
  componentWillMount () {
    window.localStorage.curPath = history.location.pathname
  }
  async componentDidMount () {
    const { layoutsStore } = this.props
    layoutsStore.getPlayerData()
    layoutsStore.getGlobalStatus()
  }
  componentWillUpdate () {
    const { layoutsStore } = this.props
    layoutsStore.getLocalPath()
  }
  render () {
    const { layoutsStore } = this.props
    const grayStyle = {
      filter: 'grayscale(50%)'
    }
    return (
      <div
        className={layoutsStore.isHomePage ? styles.layout : ''}
        style={layoutsStore.globalStatus.full_site_gray ? grayStyle : {}}
      >
        <Header />
        <div className={styles.main_wrapper}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route path={routePath.home} exact component={Home} />
            </Switch>
          </Suspense>
        </div>
        <ScrollToTop />
        <Player />
        <Footer />
      </div>
    )
  }
}

export default Layouts

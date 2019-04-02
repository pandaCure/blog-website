import React from 'react'
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import styles from './Header.module.scss'
import routePath from '@constants/routePath'
import { svgSprite } from '@constants/constants'
import svgIcons from '@assets/images/yancey-official-blog-svg-icons.svg'
import cs from 'classnames'
const headerList = {
  home: {
    url: routePath.home,
    icon: svgSprite.home
  },
  blog: {
    url: routePath.blog,
    icon: svgSprite.blog
  },
  archive: {
    url: routePath.archive,
    icon: svgSprite.archive
  },
  music: {
    url: routePath.music,
    icon: svgSprite.music
  },
  apps: {
    url: routePath.apps,
    icon: svgSprite.apps
  },
  CV: {
    url: routePath.cv,
    icon: svgSprite.cv
  }
}
@inject('articleStore')
@observer
class Header extends React.Component {
  state = { isTop: true }
  componentDidMount () {
    this.switchNavbarBackgroundColor()
  }
  switchNavbarBackgroundColor = () => {
    const top = document.documentElement.scrollTop || document.body.scrollTop
    if (!top) {
      this.setState({
        isTop: true
      })
    }
    window.addEventListener('scroll', _.throttle(() => {
      const top = document.documentElement.scrollTop || document.body.scrollTop
      if (!top) {
        this.setState({
          isTop: true
        })
      } else {
        this.setState({
          isTop: false
        })
      }
    }, 150))
  }
  render () {
    const { isTop } = this.state
    const { articleStore } = this.props
    return (
      <header
        className={cs(
          styles.yancey_common_header,
          'no-user-select',
          isTop ? styles.clear_navbar_bg : ''
        )}
      >
        <Link to={routePath.home} className={styles.yancey_logo}>
          钟繇 Official Blog
        </Link>
        <nav>
          <ul>
            {Object.keys(headerList).map(value => (
              <li className={styles.yancey_nav_item} key={value}>
                <Link to={headerList[value].url}>
                  <svg
                    className={cs(styles.header_icon, styles[`icon_${value}`])}
                  >
                    <use xlinkHref={`${svgIcons}${headerList[value].icon}`} />
                  </svg>
                  <span className={styles.menu_name}>{value}</span>
                </Link>
              </li>
            ))}
            <li
              className={styles.yancey_nav_item}
              onClick={() => articleStore.toggleShowSearch()}
            >
              <svg className={cs(styles.header_icon, styles.icon_search)}>
                <use xlinkHref={`${svgIcons}${svgSprite.search2}`} />
              </svg>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header

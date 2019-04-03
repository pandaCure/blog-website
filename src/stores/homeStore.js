import { observable, runInAction } from 'mobx'

import { homeService } from '../apis/index'

import { webpSuffix } from '../constants/constants'

class HomeStore {
  @observable announcement = ''
  @observable motto = ''
  @observable projects = []
  @observable coverUrl = ''

  getAnnouncementData = async () => {
    try {
      const res = await homeService.getAnnouncementData()
      runInAction(() => {
        this.announcement = res.data.content
      })
    } catch (e) {
      // todo
    } finally {
      // todo
    }
  }

  getMottoData = async () => {
    try {
      const res = await homeService.getMottoData()
      runInAction(() => {
        this.motto = res.data.content
      })
    } catch (e) {
      // todo
    } finally {
      // todo
    }
  }

  getProjectData = async () => {
    try {
      const res = await homeService.getProjectData()
      runInAction(() => {
        this.projects = res.data
      })
    } catch (e) {
      // todo
    }
  }

  loadBgImg = imageUrl => {
    const isWebp = window.localStorage.isWebp === 'true'
    const backgroundDOM = document.getElementById('background')
    const background = new Image()
    background.src = isWebp ? `${imageUrl}${webpSuffix}` : imageUrl
    // tslint:disable-next-line:only-arrow-functions
    background.onload = function () {
      if (backgroundDOM) {
        console.log(backgroundDOM)
        backgroundDOM.style.cssText = `background-image: url(${
          background.src
        });opacity: 1;`
      }
    }
  }

  getCoverData = async (position) => {
    let curId = window.localStorage.cover_id
    if (!curId) {
      curId = 0
    }
    try {
      const res = await homeService.getCoverData(curId, position)
      runInAction(() => {
        this.coverUrl = res.data.url
        window.localStorage.setItem('cover_id', res.data._id)
      })
      if (this.coverUrl) {
        this.loadBgImg(this.coverUrl)
      }
    } catch (e) {
      // todo
    }
  }
}

const homeStore = new HomeStore()

export default homeStore

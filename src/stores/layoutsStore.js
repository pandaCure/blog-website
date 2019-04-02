import { observable, runInAction } from 'mobx'
import { layoutsService } from '../apis/index'
import _ from 'lodash'

import APlayer from 'aplayer'
class LayoutsStore {
  @observable players = []
  @observable globalStatus = {
    full_site_gray: false,
    __v: 0,
    _id: ''
  }
  @observable isHomePage = true

  getPlayerData = async () => {
    try {
      const res = await layoutsService.getPlayerData()
      runInAction(() => {
        _.map(res.data, item => {
          this.players.push({
            name: item.title,
            artist: item.artist,
            url: item.music_file_url,
            cover: item.cover,
            lrc: item.lrc
          })
          const ap = new APlayer({
            container: document.querySelector('#player'),
            fixed: true,
            lrcType: 1,
            audio: this.players
          })
          ap.lrc.show()
        })
      })
    } catch (error) {
    } finally {
    }
  }

  getGlobalStatus = async () => {
    try {
      const res = await layoutsService.getGlobalStatus()
      runInAction(() => {
        this.globalStatus = res.data
      })
    } catch (e) {
      // todo
    }
  }

  getLocalPath = () => {
    this.isHomePage = window.localStorage.curPath === '/'
  }
}
const layoutsStore = new LayoutsStore()
export default layoutsStore

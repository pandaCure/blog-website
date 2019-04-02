import { observable, runInAction, action, computed } from 'mobx'
import {
  articleService
} from '../apis/index'
import history from '../tools/history'
import { sortBy } from '../tools/tools'

class ArticleStore {
  @observable posts = []
  @observable hots = []
  @observable tags = []
  @observable archives = []
  @observable curPage = 1
  @observable total = 0
  @observable showSearch = false
  @observable isLiked = false
  @observable curIp = ''
  @observable detail = {
    curArticle: {
      _id: '',
      header_cover: '',
      title: '',
      summary: '',
      content: '',
      publish_date: '',
      last_modified_date: '',
      tags: [],
      like_count: [],
      pv_count: 0
    },
    nextArticle: {
      id: '',
      header_cover: '',
      title: ''
    },
    previousArticle: {
      id: '',
      header_cover: '',
      title: ''
    }
  }

  @action toggleShowSearch = () => {
    this.showSearch = !this.showSearch
  }

  @action onSearchChange = (e) => {
    const event = e || window.event
    const key = event.which || event.keyCode || event.charCode
    if (key === 13) {
      history.push(`/search?q=${event.target.value}`)
      this.getPostsByTitle(event.target.value)
      this.showSearch = false
    }
  }

  @action onPageChange = current => {
    this.curPage = current
    this.getPostsByPage()
  }

  @computed get curTag () {
    return document.location.pathname.split('/').slice(-1)[0]
  }

  getPostsByPage = async () => {
    try {
      const res = await articleService.getPostsByPage(this.curPage)
      runInAction(() => {
        this.posts = res.data
        this.total = parseInt(res.headers.amount, 10)
        this.curPage = 1
      })
    } catch (e) {

    } finally {}
  }

  getPostsByTitle = async title => {
    try {
      const res = await articleService.getPostsByTitle(title)
      runInAction(() => {
        this.posts = res.data
      })
    } catch (e) {}
  }

  getPostsByTag = async (tag = this.curTag) => {
    try {
      const res = await articleService.getPostsByTag(tag)
      runInAction(() => {
        this.posts = res.data
      })
    } catch (e) {}
  }

  getHots = async () => {
    try {
      const res = await articleService.getHots()
      runInAction(() => {
        this.hots = res.data
      })
    } catch (e) {}
  }

  getArchives = async () => {
    try {
      const res = await articleService.getArchives()
      runInAction(() => {
        this.archives = res.data.sort(sortBy('_id', 'year'))
      })
    } catch (e) {
      // todo
    }
  }

  getPostById = async (id) => {
    history.push(`/p/${id}`)
    try {
      const res = await articleService.getPostById(id)
      runInAction(() => {
        this.detail = res.data
      })
    } catch (e) {
      history.push('/404')
    }
  }

  handleLikes = async () => {
    try {
      const res = await articleService.handleLikes(window.location.pathname.split('/').slice(-1)[0], this.curIp)
      runInAction(() => {
        this.likeNum = res.data.like_number
      })
    } catch (e) {
      // todo
    }
  }

  getLikes = async (id, ip) => {
    try {
      const res = await articleService.getLikes(id, ip)
      runInAction(() => {
        this.isLiked = res.data.liked
      })
    } catch (e) {
      // todo
    }
  }

  getIp = async () => {
    try {
      const res = await articleService.getIp()
      runInAction(() => {
        this.curIp = res.data
      })
    } catch (e) {
      // todo
    }
  }

  increasePV = async (id) => {
    try {
      await articleService.increasePV(id)
    } catch (e) {
      // todo
    }
  }
}

const articleStore = new ArticleStore()

export default articleStore

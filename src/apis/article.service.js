import {
  GET,
  PUT
} from '../tools/axios'
import {
  ipify
} from '../constants/constants'
class ArticleService {
  async getPostById (id) {
    return GET(`/articles/${id}`, null, '')
  }
  async getPostsByPage (page) {
    return GET(`/articleList/page/${page}`, null, '')
  }
  async getPostsByTitle (title) {
    return GET(`/articlesByTitle?q=${title}`, null, '')
  }
  async getAllTags () {
    return GET('/allTags', null, '')
  }
  async getPostsByTag (tag) {
    return GET(`/articlesByTag?tag=${tag}`, null, '')
  }
  async getHots () {
    return GET('/articlesByPV', null, '')
  }
  async getArchives () {
    return GET('/archives', null, '')
  }
  async handleLikes (id, ip) {
    return PUT(`/likes/${id}?ip=${ip}`, null, '')
  }
  async getLikes (id, ip) {
    return GET(`/likes/${id}?ip=${ip}`, null, '')
  }
  async getIp () {
    return GET(ipify, null, '')
  }
  async increasePV (id) {
    return PUT(`/articlePV/${id}`, null, '')
  }
}
const articleService = new ArticleService()
export default articleService

import { GET } from '../tools/axios'

class HomeService {
  async getAnnouncementData () {
    return GET('/latestAnnouncements', null, '')
  }

  async getMottoData () {
    return GET('/latestMotto', null, '')
  }

  async getProjectData () {
    return GET('/latestThreeProjects', null, '')
  }

  async getCoverData (curId, position) {
    return GET(`/covers/${curId}?position=${position}`, null, '')
  }
}

const homeService = new HomeService()

export default homeService

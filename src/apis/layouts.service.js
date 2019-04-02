import { GET } from '../tools/axios'
class LayoutsService {
  async getGlobalStatus () {
    return GET(`/globalStatus`, null, '')
  }
  async getPlayerData () {
    return GET(`/litePlayers`, null, '')
  }
}

const layoutsService = new LayoutsService()
export default layoutsService

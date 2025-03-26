import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Watcher } from "@/models/Watcher.js"
import { AppState } from "@/AppState.js"

class WatchersService {
  async getWatchersByAlbumId(albumId) {
    const response = await api.get(`/api/albums/${albumId}/watchers`)
    logger.log('GOT WATCHERS', response.data)
    const watcherProfiles = response.data.map(pojo => new Watcher(pojo))
    AppState.watcherProfiles = watcherProfiles
  }
}

export const watchersService = new WatchersService()
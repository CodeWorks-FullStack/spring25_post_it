import { dbContext } from "../db/DbContext.js"

class WatchersService {

  async createWatcher(watcherData) {
    const watcher = await dbContext.Watchers.create(watcherData)
    await watcher.populate('profile', 'name picture')
    await watcher.populate('album')
    return watcher
  }

  async getWatchersByAlbumId(albumId) {
    //                                             { albumId: '67e2f12f43efcaffa6899d82' }
    const watchers = await dbContext.Watchers.find({ albumId: albumId }).populate('profile', 'name picture')
    return watchers
  }
}

export const watchersService = new WatchersService()
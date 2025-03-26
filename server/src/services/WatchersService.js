import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

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

  async getWatchersByAccountId(userId) {
    const watchers = await dbContext.Watchers.find({ accountId: userId }).populate('album')
    return watchers
  }

  async deleteWatcher(watcherId, userInfo) {
    const watcher = await dbContext.Watchers.findById(watcherId)
    if (watcher == null) {
      throw new BadRequest(`Invalid id: ${watcherId}`)
    }
    if (watcher.accountId != userInfo.id) {
      throw new Forbidden(`YOU CAN NOT DELETE SOMEONE ELSE'S WATCHED ALBUM ${userInfo.nickname.toUpperCase()} 🚓🚓🚓🚓🚓🚓🚓`)
    }
    await watcher.deleteOne()
    return 'No longer watching album!'
  }
}

export const watchersService = new WatchersService()
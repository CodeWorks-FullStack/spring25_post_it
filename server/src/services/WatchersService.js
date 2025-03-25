import { dbContext } from "../db/DbContext.js"

class WatchersService {
  async createWatcher(watcherData) {
    const watcher = await dbContext.Watchers.create(watcherData)
    await watcher.populate('profile', 'name picture')
    await watcher.populate('album')
    return watcher
  }
}

export const watchersService = new WatchersService()
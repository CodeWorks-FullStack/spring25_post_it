import { Auth0Provider } from "@bcwdev/auth0provider";
import { watchersService } from "../services/WatchersService.js";
import BaseController from "../utils/BaseController.js";

export class WatchersController extends BaseController {
  constructor() {
    super('api/watchers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createWatcher)
      .delete('/:watcherId', this.deleteWatcher)
  }

  /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async createWatcher(request, response, next) {
    try {
      const watcherData = request.body
      const userInfo = request.userInfo
      watcherData.accountId = userInfo.id
      const watcher = await watchersService.createWatcher(watcherData)
      response.send(watcher)
    } catch (error) {
      next(error)
    }
  }

  /**
  * @param {import("express").Request} request
  * @param {import("express").Response} response
  * @param {import("express").NextFunction} next
  */
  async deleteWatcher(request, response, next) {
    try {
      const watcherId = request.params.watcherId
      const userInfo = request.userInfo
      const message = await watchersService.deleteWatcher(watcherId, userInfo)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}
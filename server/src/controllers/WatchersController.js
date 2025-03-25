import { Auth0Provider } from "@bcwdev/auth0provider";
import { watchersService } from "../services/WatchersService.js";
import BaseController from "../utils/BaseController.js";

export class WatchersController extends BaseController {
  constructor() {
    super('api/watchers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createWatcher)
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
}
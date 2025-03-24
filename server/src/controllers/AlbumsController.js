import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";

export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async createAlbum(request, response, next) {
    try {
      const albumData = request.body
      const userInfo = request.userInfo
      // NOTE whoever makes the request owns the data
      // REVIEW never ever trust the client
      albumData.creatorId = userInfo.id
      const album = await albumsService.createAlbum(albumData)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }
}
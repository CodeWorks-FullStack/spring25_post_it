import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { picturesService } from "../services/PicturesService.js";
import { socketProvider } from "../SocketProvider.js";

export class PicturesController extends BaseController {
  constructor() {
    super('api/pictures')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPicture)
  }
  /**
      * @param {import("express").Request} request
      * @param {import("express").Response} response
      * @param {import("express").NextFunction} next
      */
  async createPicture(request, response, next) {
    try {
      const pictureData = request.body
      const userInfo = request.userInfo
      pictureData.creatorId = userInfo.id
      const picture = await picturesService.createPicture(pictureData)
      response.send(picture)

      socketProvider.messageRoom(picture.albumId.toString(), 'CREATED_PICTURE', picture)
    } catch (error) {
      next(error)
    }
  }
}
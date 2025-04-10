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
      .delete('/:pictureId', this.deletePicture)
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
      // @ts-ignore
      socketProvider.messageUser(picture.album.creatorId.toString(), 'CREATED_PICTURE_FOR_USER_ALBUM', picture)
    } catch (error) {
      next(error)
    }
  }
  /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
  */
  async deletePicture(request, response, next) {
    try {
      const pictureId = request.params.pictureId
      const userInfo = request.userInfo
      await picturesService.deletePicture(pictureId, userInfo)
      response.send("Picture deleted!")
    } catch (error) {
      next(error)
    }
  }
}
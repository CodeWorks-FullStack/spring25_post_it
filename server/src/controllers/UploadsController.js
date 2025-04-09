import fileUpload from "express-fileupload";
import BaseController from "../utils/BaseController.js";
import { uploadsService } from "../services/UploadsService.js";
import { Auth0Provider } from "@bcwdev/auth0provider";


export class UploadsController extends BaseController {
  constructor() {
    super('api/upload')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(fileUpload())
      .post('', this.uploadImage)
  }

  async uploadImage(request, response, next) {
    try {
      const userId = request.userInfo.id
      const uploadedFile = request.files.upload
      console.log(uploadedFile)
      const uploadedResponse = await uploadsService.uploadImage(uploadedFile, userId)
      response.send(uploadedResponse)
    } catch (error) {
      next(error)
    }
  }
}
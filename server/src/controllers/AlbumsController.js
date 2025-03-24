import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js";

export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .get('', this.getAllAlbums)
      .get('/:albumId', this.getAlbumById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
      .delete('/:albumId', this.archiveAlbum)
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getAllAlbums(request, response, next) {
    try {
      const albums = await albumsService.getAllAlbums()
      response.send(albums)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async getAlbumById(request, response, next) {
    try {
      const albumId = request.params.albumId
      const album = await albumsService.getAlbumById(albumId)
      response.send(album)
    } catch (error) {
      next(error)
    }
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
      // NOTE make sure you open the index.d.ts file from types or else you will not get correct intellisense on userInfo
      albumData.creatorId = userInfo.id
      const album = await albumsService.createAlbum(albumData)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

  /**
    * @param {import("express").Request} request
    * @param {import("express").Response} response
    * @param {import("express").NextFunction} next
    */
  async archiveAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId
      const album = await albumsService.archiveAlbum(albumId)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

}
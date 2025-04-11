import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { albumsService } from "./AlbumsService.js"

class PicturesService {

  async createPicture(pictureData) {
    const album = await albumsService.getAlbumById(pictureData.albumId)

    if (album.archived) {
      throw new Forbidden(`${album.title} is archived and no longer accepting pictures`)
    }

    const picture = await dbContext.Pictures.create(pictureData)
    await picture.populate('creator', 'name picture')
    await picture.populate('album')
    return picture
  }

  async getPicturesByAlbumId(albumId) {
    const pictures = await dbContext.Pictures.find({ albumId: albumId }).populate('creator', 'name picture')
    return pictures
  }

  async getPictureById(pictureId) {
    const picture = await dbContext.Pictures.findById(pictureId)
    if (picture == null) throw new BadRequest(`Invalid id: ${pictureId}`)
    return picture
  }

  async deletePicture(pictureId, userInfo) {
    const picture = await this.getPictureById(pictureId)

    if (picture.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT DELETE ANOTHER USER'S PICTURE, ${userInfo.nickname.toUpperCase()}`)
    }

    await picture.deleteOne()
  }

  async destroyPicture(pictureId) {
    const picture = await this.getPictureById(pictureId)

    await picture.deleteOne()
  }


}

export const picturesService = new PicturesService()
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class AlbumsService {
  async getAllAlbums() {
    const albums = await dbContext.Albums.find().populate('creator', 'name picture').sort('-createdAt')
    return albums
  }
  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator', 'name picture')
    if (album == null) {
      throw new BadRequest(`Invalid album id: ${albumId}`)
    }
    return album
  }
  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator', 'name picture')
    return album
  }

  async archiveAlbum(albumId, userInfo) {
    const album = await this.getAlbumById(albumId)
    if (album.creatorId != userInfo.id) {
      throw new Forbidden(`YOU CANNOT ARCHIVE ANOTHER USER'S ALBUM, ${userInfo.nickname.toUpperCase()}! 🚓🚓🚓`)
    }
    //❌ await album.deleteOne()
    // NOTE soft delete
    album.archived = !album.archived
    await album.save() // updates the database
    return album
  }
}

export const albumsService = new AlbumsService()
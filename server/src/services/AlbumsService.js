import { dbContext } from "../db/DbContext.js"

class AlbumsService {
  async getAllAlbums() {
    const albums = await dbContext.Albums.find().populate('creator', 'name picture')
    return albums
  }
  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator', 'name picture')
    return album
  }
  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator', 'name picture')
    return album
  }

  async archiveAlbum(albumId) {
    const album = await this.getAlbumById(albumId)
    //❌ await album.deleteOne()
    // NOTE soft delete
    album.archived = !album.archived
    await album.save() // updates the database
    return album
  }
}

export const albumsService = new AlbumsService()
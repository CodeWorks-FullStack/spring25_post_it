import { dbContext } from "../db/DbContext.js"

class AlbumsService {
  async getAllAlbums() {
    const albums = await dbContext.Albums.find().populate('creator', 'name picture')
    return albums
  }
  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator', 'name picture')
    return album
  }
}

export const albumsService = new AlbumsService()
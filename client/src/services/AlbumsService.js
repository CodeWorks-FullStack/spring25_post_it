import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Album } from "@/models/Album.js"
import { AppState } from "@/AppState.js"

class AlbumsService {
  async createAlbum(albumData) {
    const response = await api.post('api/albums', albumData)
    logger.log('CREATED ALBUM', response.data)
    const album = new Album(response.data)
    // NOTE make sure your data renders in way that matches how your API sorts it
    AppState.albums.unshift(album)
    // NOTE makes the album accessible to any function that calls 'createAlbum'
    return album
  }
  async getAlbums() {
    const response = await api.get('api/albums')
    logger.log('Got albums', response.data)
    const albums = response.data.map(pojo => new Album(pojo))
    AppState.albums = albums
  }
  async getAlbumById(albumId) {
    const response = await api.get(`api/albums/${albumId}`)
    logger.log('GOT ALBUM', response.data)
    const album = new Album(response.data)
    AppState.activeAlbum = album
  }
  async archiveAlbum(albumId) {
    const response = await api.delete(`api/albums/${albumId}`)
    logger.log('ARCHIVED ALBUM', response.data)
    const album = new Album(response.data)
    AppState.activeAlbum = album
  }
}

export const albumsService = new AlbumsService()
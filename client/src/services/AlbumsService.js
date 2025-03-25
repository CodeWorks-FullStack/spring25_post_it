import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Album } from "@/models/Album.js"
import { AppState } from "@/AppState.js"

class AlbumsService {

  async createAlbum(albumData) {
    const response = await api.post('api/albums', albumData)
    logger.log('CREATED ALBUM', response.data)
    const album = new Album(response.data)
    AppState.albums.unshift(album)
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
  }
}

export const albumsService = new AlbumsService()
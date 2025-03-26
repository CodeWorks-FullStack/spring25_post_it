import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Picture } from "@/models/Picture.js"
import { AppState } from "@/AppState.js"

class PicturesService {
  async createPicture(pictureData) {
    const response = await api.post('api/pictures', pictureData)
    logger.log('CREATED PICTURE', response.data)
    const picture = new Picture(response.data)
    AppState.pictures.push(picture)
  }
  async getPicturesByAlbumId(albumId) {
    const response = await api.get(`api/albums/${albumId}/pictures`)
    logger.log('GOT PICTURES', response.data)
    const pictures = response.data.map(pojo => new Picture(pojo))
    AppState.pictures = pictures
  }
}

export const picturesService = new PicturesService()
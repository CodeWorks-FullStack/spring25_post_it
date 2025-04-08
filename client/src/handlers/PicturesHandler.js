import { AppState } from "@/AppState.js";
import { Picture } from "@/models/Picture.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

export class PicturesHandler extends SocketHandler {
  constructor() {
    super()
    this.on('CREATED_PICTURE', this.onCreatedPicture)
  }

  onCreatedPicture(payload) {
    const picture = new Picture(payload)
    AppState.pictures.push(picture)
  }
}

export const picturesHandler = new PicturesHandler()
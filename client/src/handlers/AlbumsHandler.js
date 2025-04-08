import { Pop } from "@/utils/Pop.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

class AlbumsHandler extends SocketHandler {
  constructor() {
    super()
    this.on('CREATED_ALBUM', this.onCreatedAlbum)
  }

  onCreatedAlbum() {
    Pop.toast("Someone created a new album!")
  }
}

export const albumsHandler = new AlbumsHandler()
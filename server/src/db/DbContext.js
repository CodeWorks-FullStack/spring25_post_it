import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { AlbumSchema } from '../models/Album.js';
import { WatcherSchema } from '../models/Watcher.js';
import { PictureSchema } from '../models/Picture.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema)
  Albums = mongoose.model('Album', AlbumSchema)
  Watchers = mongoose.model('Watcher', WatcherSchema)
  Pictures = mongoose.model('Picture', PictureSchema)
}

export const dbContext = new DbContext()

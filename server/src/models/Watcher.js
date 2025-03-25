import { Schema } from "mongoose";

export const WatcherSchema = new Schema(
  {
    accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    albumId: { type: Schema.ObjectId, required: true, ref: 'Album' },
  },
  {
    toJSON: { virtuals: true, versionKey: false }
  }
)

WatcherSchema.virtual('profile', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

WatcherSchema.virtual('album', {
  localField: 'albumId',
  ref: 'Album',
  foreignField: '_id',
  justOne: true
})
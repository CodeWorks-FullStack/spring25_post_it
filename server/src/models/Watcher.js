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


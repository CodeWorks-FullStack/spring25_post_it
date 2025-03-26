import { Schema } from "mongoose";

export const AlbumSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    title: { type: String, required: true, minLength: 3, maxLength: 25 },
    description: { type: String, minLength: 15, maxLength: 250 },
    coverImg: { type: String, required: true, maxLength: 1000, },
    archived: { type: Boolean, required: true, default: false },
    category: { type: String, required: true, enum: ['aesthetics', 'food', 'games', 'animals', 'misc', 'vibes'] }
  },
  {
    timestamps: true,
    // NOTE allows us to use virtuals and removes the __V
    toJSON: { virtuals: true, versionKey: false }
  }
)

AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

AlbumSchema.virtual('watcherCount', {
  localField: '_id',
  ref: 'Watcher',
  foreignField: 'albumId',
  justOne: false,
  count: true
})
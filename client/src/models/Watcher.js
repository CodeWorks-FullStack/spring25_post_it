import { Profile } from "./Account.js"

export class Watcher {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.albumId = data.albumId
    this.profile = new Profile(data.profile)
  }
}
export interface User {
  _id: string
  username: string
  email: string
  avatar: string
  role: string
  balance: number
  discord: Discord
  createdAt: string
  updatedAt: string
}

export interface Discord {
  id: string
  avatar: string
  discriminator: string
  verified: boolean
}

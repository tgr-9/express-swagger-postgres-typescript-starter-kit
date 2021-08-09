export interface IPostRatePayload {
  postId: number
  userId: number
  rate: number
}

export interface IPostRate extends IPostRatePayload {
  id: number
}
export interface IUserBasicPayload {
  firstname?: string
  lastname?: string
  email: string
  password: string
}
export interface IUserPayload extends IUserBasicPayload {
  id?: number
}

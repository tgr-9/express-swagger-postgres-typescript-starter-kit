export interface ITable {
  [key: string]: string
}
export const TABLES: ITable = {
  USER_SESSION: 'userSession',
  USER: 'user',
  POST: 'post',
  POST_RATE: 'postRate',
};

export default TABLES;
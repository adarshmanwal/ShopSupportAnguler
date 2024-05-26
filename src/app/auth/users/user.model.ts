export class User {
  constructor(
    public id: number,
    public email: string,
    public name: string,
    public userType: string,
    // private _token: string,
    // private _tokenExpireationDate
  ) {}

  // get token() {
  //   if (
  //     !this._tokenExpireationDate ||
  //     new Date() > this._tokenExpireationDate
  //   ) {
  //     return null;
  //   }
  //   return this._token;
  // }
}

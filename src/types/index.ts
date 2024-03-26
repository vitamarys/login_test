export interface ILogin{
    email: string,
    password: string
}
export interface ILoginResponse {
    error: number,
    detail: string,
    timestamp: number,
    access_token: string,
    token_expire: number,
    refresh_token: string,
    refresh_token_expire: number
}
export interface IPasswordSet{
    token: string | null,
    secret: string | null,
    password: string,
    password_confirm: string
  }
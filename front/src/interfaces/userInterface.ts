export interface User {
    access_token(tokenCookieName: string, access_token: any, tokenCookieExpireTime: string, arg3: string, arg4: string, arg5: boolean): unknown;
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    token?: string,
}
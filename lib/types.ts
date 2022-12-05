export interface Session {
    user : {
        accessToken: string,
        refreshToken: string,
        username: string
    }
}
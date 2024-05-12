export interface User {
    id?: number,
    name: string,
    email: string,
    password?: string,
    profile_picture: string,
    role: "organisation" | "user"

}
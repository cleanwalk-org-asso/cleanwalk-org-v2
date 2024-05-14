export interface User {
    id?: number,
    name: string,
    email: string,
    password?: string,
    profile_picture: string,
    role: "organisation" | "user"
}

export interface Association {
    user_id: number,
    name: string,
    email: string,
    profile_picture: string,
    description?: string,
    banner_img?: string,
    web_site?: string,
    social_media?: Record<string, string>
}
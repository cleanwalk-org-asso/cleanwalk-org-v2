export interface User {
    id?: number,
    name: string,
    email: string,
    password?: string,
    profile_picture: string,
    role: "organisation" | "user"
}

export interface modifyAssociation {
    name?: string,
    description?: string,
    profile_picture?: string,
    banner_img?: string
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
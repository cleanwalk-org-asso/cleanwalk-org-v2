export interface User {
    id?: number,
    name: string,
    email: string,
    password?: string,
    profilePicture: string,
    role: "ASSOCIATION" | "USER" | "ADMIN",
}

export interface modifyAssociation {
    name?: string,
    description?: string,
    profilePicture?: string,
    banner_img?: string
}

export interface Association {
    id: number,
    name: string,
    email: string,
    profilePicture: string,
    description?: string,
    banner_img?: string,
    web_site?: string,
    social_media?: Record<string, string>
}
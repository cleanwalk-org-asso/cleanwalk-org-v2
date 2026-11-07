export interface User {
    id?: number,
    name: string,
    email: string,
    password?: string,
    profilePicture: string,
    role: "ASSOCIATION" | "USER" | "ADMIN",
}

export interface modifyAssociation {
    description?: string,
    webSite?: string,
    socialMedias?: string,
    bannerImg?: string,
    profilePicture?: string,
}

export interface Association {
    id: number,
    name: string,
    email: string,
    profilePicture: string,
    description?: string | null,
    bannerImg?: string | null,
    webSite?: string | null,
    socialMedias?: string | null,
}

export interface Cleanwalk {
    id?: number,
    name: string,
    description: string,
    date_begin: Date,
    duration: number,
    pos_lat: number,
    pos_long: number,
    address?: string,
    img_url?: string,
    city?: string,
    host? : {
        id?: number,
        firstname: string,
        lastname: string,
        profile_picture: string,
        role_id: number,
    }
}
export interface Cleanwalk {
    id?: number,
    name: string,
    description: string,
    date_begin: Date,
    duration: number,
    pos_lat: number,
    pos_long: number,
    address?: string,
    city?: string,
}
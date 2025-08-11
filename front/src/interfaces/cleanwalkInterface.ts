export interface Cleanwalk {
    id?: number,
    name: string,
    description: string,
    date_begin: Date,
    duration: number,
    pos_lat: number,
    pos_long: number,
    address: string,
    img_url?: string,
    city?: string,
    host? : {
        id?: number,
        name: string,
        profilePicture: string,
        role: string,
    }
}

export interface CleanwalkCreation {
    name: string,
    description: string,
    date_begin: string,
    duration: number,
    pos_lat: number,
    pos_long: number,
    address: string,
    img_url?: string,
    user_id: number,
    city: string,
}

export interface SingleCleanwalk {
    id: number;
    name: string;
    pos_lat: number;
    pos_long: number;
    date_begin: string;
    duration: number;
    description: string;
    address: string;
    city: string;
    img_url: string;
    host: {
        id: number;
        name: string;
        role: string;
        profilePicture: string;
    };
    participant_count: number;
    is_user_participant: boolean;
}

export interface SubscibeToCleanwalk {
    cleanwalk_id: number;
    user_id: number;
    nb_participants: number;
}
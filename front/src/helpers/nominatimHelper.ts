import ky from 'ky';
import type { Coordinate } from '@/interfaces/coordinateInterface'
import { add } from 'date-fns';
import { fi } from 'date-fns/locale';

const nominatimUrl = 'http://localhost:5173/nominatim';

// countries in which nominatim searches
const countryCodesArray = ['fr', 'be'];

// the language nominatim returns for the places names
const accept_language = ['fr'];

function formatAddressFromJson(addressData: any): string {
    // On tente d'extraire les informations pertinentes en considérant différents champs possibles
    const houseNumber = addressData.house_number || '';
    const road = addressData.road || '';
    // On ajoute les nouveaux champs pour plus de flexibilité
    const city = addressData.city || '';
    const municipality = addressData.municipality || addressData.village || '';
    const village = addressData.village || '';
    const highway = addressData.highway || '';
    const square = addressData.square || '';
  
    // On choisit le niveau de détail le plus spécifique disponible pour la localité
    const localDetail =  city || village || municipality || '';
  
    // On construit une liste avec les éléments non vides
    const parts = [houseNumber, road,  highway, square, localDetail].filter(part => part !== '');
  
    // On joint les parties avec un espace pour former une adresse complète
    return parts.join(' ').trim();
  }

const nominatimRequest = async (url: string, params: Record<string, any>) => {
    // the output format
    params.format = 'json';

    if (params.countryCodesArray) {
        params.countrycodes = params.countryCodesArray.join(',');
    }

    if (params.accept_language) {
        params['accept-language'] = params.accept_language;
    }

    const searchParams = new URLSearchParams(params as Record<string, string>);
    const fullUrl = `${url}?${searchParams.toString()}`;

    try {
        const res = await ky.get(fullUrl).json<any>();
        return res;
    } catch (error) {
        console.log('Nominatim error: ' + error);
        return undefined;
    }
};

/**
 * Get the GPS coordinates of a place
 * @param searchString The place to look for (state, city, road...)
 * @returns The data of the response
 */
const nominatimSearch = async (searchString: string): Promise<Coordinate | undefined> => {
    const params = {
        q: searchString,
        countryCodesArray: countryCodesArray,
        addressdetails: 1,
        accept_language: accept_language,
    };

    const url = `${nominatimUrl}/search`;
    const result = await nominatimRequest(url, params);

    if (result) {
        const firstResult = result[0];
        console.log(firstResult);
        if (firstResult) {
            return {
                pos_lat: firstResult.lat,
                pos_long: firstResult.lon,
                address: formatAddressFromJson(firstResult.address),
                city: firstResult.address.city ?? firstResult.address.village ?? firstResult.address.town ?? firstResult.address.municipality,
            };
        }
    }

    return undefined;
};

/**
 * Get the name of the GPS coordinates (country, state, city, road...)
 * @param lat The latitude
 * @param lon The longitude
 * @returns The data of the response
 */
const nominatimReverse = async (lat: number, lon: number) => {
    const params = {
        lat: lat,
        lon: lon,
        countryCodesArray: countryCodesArray,
        accept_language: accept_language,
    };

    const url = `${nominatimUrl}/reverse`;

    return nominatimRequest(url, params);
};

/**
 *
 * @param lat The latitude
 * @param lon The longitude
 * @returns The formatted address of the GPS coordinates: road, city
 */
const nominatimReverseWrittenAddress = async (lat: number, lon: number) => {
    let location = '';
    const result = await nominatimReverse(lat, lon).catch((error) => {
        console.log(error);
    });

    if (result == null) {
        return 'Address not found';
    }

    if (result.address.road != undefined) {
        location = result.address.road + ', ';
    }

    if (result.address.city != undefined) {
        location += result.address.city;
    } else {
        location += result.address.municipality;
    }

    return location;
};

export default {
    nominatimSearch,
    nominatimReverse,
    nominatimReverseWrittenAddress,
};

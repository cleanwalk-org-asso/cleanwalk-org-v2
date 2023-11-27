import axios from 'axios';

const nominatimUrl = 'http://localhost:5173/nominatim';

// countries in which nominatim searches
const countryCodesArray =  ['fr', 'be'];

// the language nominatim returns for the places names
const accept_language = ['fr'];

const nominatimRequest = async (url: URL, params: any) => {
    // the output format
    params.format = 'json';

    if (params.countryCodesArray) {
        params.countrycodes = params.countryCodesArray.join(',');
    }

    if (params.accept_language) {
        params['accept-language'] = params.accept_language;
    }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    console.log(url.toJSON());

    try{
        const res = await axios.get(url.toJSON());
        return res.data;
    } catch(error) {
        console.log('Nominatim error: ' + error);
        return undefined;
    }
}

/**
 * Get the GPS coordinates of a place
 * @param searchString The place to look for (state, city, road...)
 * @returns The data of the response
 */
const nominatimSearch = async (searchString: String) => {
    const params: any = {
        q: searchString,
        countryCodesArray: countryCodesArray,
        accept_language: accept_language,
    };

    const url = new URL(nominatimUrl + '/search');

    return nominatimRequest(url, params);
}

/**
 * Get the name of the GPS coordinates (country, state, city, road...)
 * @param lat The latitude
 * @param lon The longitude
 * @returns The data of the response
 */
const nominatimReverse = async (lat: number, lon: number) => {
    const params: any = {
        lat: lat,
        lon: lon,
        countryCodesArray: countryCodesArray,
        accept_language: accept_language,
      };

    const url = new URL(nominatimUrl + '/reverse');

    return nominatimRequest(url, params);
}

/**
 * 
 * @param lat The latitude
 * @param lon The longitude
 * @returns The formatted address of the GPS coordinates: road, city
 */
const nominatimReverseWrittenAddress = async (lat: number, lon: number) : Promise<string> => {
    let location = '';
    const result = await nominatimReverse(lat, lon)
                    .catch(error => {
                        console.log(error);
                    });

    if(result == null){
        return 'Address not found';
    }

    if(result.address.road != undefined) {
        location = result.address.road + ', ';
    }

    if(result.address.city != undefined) {
        location += result.address.city;
    } else {
        location += result.address.municipality;
    }

    return location;
}

export default {
    nominatimSearch,
    nominatimReverse,
    nominatimReverseWrittenAddress,
}
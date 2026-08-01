const blockedCountries = [

];

export async function geoFilter(country) {

    if (

        blockedCountries.includes(country)

    ) {

        return {

            allowed: false

        };

    }

    return {

        allowed: true

    };

}

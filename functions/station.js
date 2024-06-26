exports.handler = async (event, context) => {
    const { httpMethod, queryStringParameters } = event;

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    const locations = {
        "Howrah": { lat: 22.5858, long: 88.3426 },
        "Delhi": { lat: 28.6415, long: 77.2190 },
        "Mumbai": { lat: 18.9670, long: 72.8194 },
        "Chennai": { lat: 13.0827, long: 80.2757 },
        "Lucknow": { lat: 26.8239, long: 80.9210 },
        "Raipur": { lat: 21.2514, long: 81.6296 },
        "Kalyani": { lat: 22.9750, long: 88.4345 },
        "Chembur": { lat: 19.0522, long: 72.9005 },
        "Royapuram": { lat: 13.1137, long: 80.2954 },
        "Alamnagar": { lat: 25.6390, long: 86.9148 },
        "Gondia": { lat: 21.4549, long: 80.1961 }
    };

    if (httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: 'Preflight OK'
        };
    }

    if (httpMethod === 'GET') {
        const city = queryStringParameters && queryStringParameters.city;

        if (!city) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(locations)
            };
        }

        const cityData = locations[city];
        if (cityData) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ city: city, coordinates: cityData })
            };
        } else {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'City not found' })
            };
        }
    }

    return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
    };
};

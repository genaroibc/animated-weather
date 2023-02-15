import { Coordinates, KnownError, KnownResponse } from '@/types/globals';
import { isCoordsAPIResponse } from '@/utils/isCoordsAPIResponse';
import { isEmptyValue } from '@/utils/isEmptyValue';

const GEOCODER_API_URL = process.env.NEXT_PUBLIC_GEOCODER_API_URL;
const GEOCODER_API_KEY = process.env.NEXT_PUBLIC_GEOCODER_API_KEY;

const ERROR_MESSAGE = 'env variable is not defined';

if (!GEOCODER_API_URL) {
	throw new Error(`"GEOCODER_API_URL" ${ERROR_MESSAGE}`);
}

if (!GEOCODER_API_KEY) {
	throw new Error(`"API_KEY" ${ERROR_MESSAGE} - ` + process.env.API_KEY);
}

export async function getCoordsByCityName(
	cityName: string
): Promise<KnownResponse<Coordinates> | KnownError> {
	const URL = `${GEOCODER_API_URL}?q=${cityName.trim()}&appid=${GEOCODER_API_KEY}`;

	try {
		const response = await fetch(URL);
		const data = await response.json();

		if (isEmptyValue(data) || !isCoordsAPIResponse(data[0])) {
			return { ok: false, message: 'Location not found' };
		}

		const { lon, lat } = data[0];

		return { ok: true, data: { longitude: lon, latitude: lat } };
	} catch (error) {
		const errorMsg =
			(error as { message: string })?.message ??
			'There was an error, please try again later';

		return { ok: false, message: errorMsg };
	}
}

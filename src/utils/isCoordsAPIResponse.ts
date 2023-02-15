import { CoordsAPIResponse } from '@/types/coords-api-response';
import { isEmptyValue } from './isEmptyValue';

export function isCoordsAPIResponse(data: unknown): data is CoordsAPIResponse {
	if (!(data instanceof Object)) return false;

	const castedData = data as Record<string, unknown>;

	return (
		!isEmptyValue(castedData) &&
		!isEmptyValue(castedData.local_names) &&
		!isEmptyValue(castedData.lon) &&
		!isEmptyValue(castedData.lat) &&
		!isEmptyValue(castedData.country)
	);
}

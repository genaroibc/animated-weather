import { Weather } from '@/types/api-reponse';
import { isEmptyValue } from './isEmptyValue';

export function isWeatherData(data: unknown): data is Weather {
	if (!(data instanceof Object)) return false;

	const castedData = data as Record<string, unknown>;

	return (
		!isEmptyValue(castedData) &&
		!isEmptyValue(castedData.coord) &&
		!isEmptyValue(castedData.weather) &&
		!isEmptyValue(castedData.base) &&
		!isEmptyValue(castedData.main) &&
		!isEmptyValue(castedData.visibility) &&
		!isEmptyValue(castedData.wind) &&
		!isEmptyValue(castedData.clouds) &&
		!isEmptyValue(castedData.dt) &&
		!isEmptyValue(castedData.sys) &&
		!isEmptyValue(castedData.timezone) &&
		!isEmptyValue(castedData.id) &&
		!isEmptyValue(castedData.name) &&
		!isEmptyValue(castedData.cod)
	);
}

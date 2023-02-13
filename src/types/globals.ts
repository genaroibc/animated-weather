export type TemperatureUnit = 'degrees' | 'farenheit';

export type HideDirection = 'left' | 'right' | 'top' | 'bottom';

export type Coordinates = { latitude: number; longitude: number };

export interface KnownError {
	ok: false;
	message: string;
}

export interface KnownResponse<T> {
	ok: true;
	data: T;
}

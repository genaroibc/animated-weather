export type TemperatureUnit = 'degrees' | 'farenheit';

export type HideDirection = 'left' | 'right' | 'top' | 'bottom';

export type Coordinates = { latitude: number; longitude: number };

export type KnownError = {
	ok: false;
	message: string;
};

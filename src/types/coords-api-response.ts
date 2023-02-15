export type CoordsAPIResponse = {
	name: string;
	local_names?: Record<string, never>;
	lat: number;
	lon: number;
	country: string;
	state?: string;
};

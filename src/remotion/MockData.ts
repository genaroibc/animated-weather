const WEATHER: Weather = {
	coord: { lon: -0.1257, lat: 51.5085 },
	weather: [
		{ id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04d' },
	],
	base: 'stations',
	main: {
		temp: 4.12,
		feels_like: 1.8,
		temp_min: 2.86,
		temp_max: 5.56,
		pressure: 1037,
		humidity: 80,
	},
	visibility: 10_000, // in metters. Max is 10_000 metters
	wind: { speed: 2.57 /* metters/second */, deg: 60 }, // wind direction in degrees
	clouds: {
		all: 100 /* percentage of clouds. 100% is so cloudly (implement a message for this) */,
	},
	dt: 1674576100,
	sys: {
		type: 2,
		id: 2075535,
		country: 'GB',
		sunrise: 1674546627,
		sunset: 1674578053,
	},
	timezone: 0, // utc time zone
	id: 2643743,
	name: 'London',
	cod: 200,
};

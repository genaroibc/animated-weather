import { Weather } from '@/types/api-reponse';
import { KnownError, KnownResponse } from '@/types/globals';

export async function renderVideoOnServer(
	weatherData: Weather
): Promise<KnownResponse<string> | KnownError> {
	try {
		const response = await fetch('/api/render', {
			method: 'POST',
			body: JSON.stringify(weatherData),
		});

		const videoBlob = await response.blob();
		const videoUrl = URL.createObjectURL(videoBlob);

		// to do: validate videoUrl
		return { ok: true, data: videoUrl };
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message:
				'There was an error rendering your video. Please try again later.',
		};
	}
}

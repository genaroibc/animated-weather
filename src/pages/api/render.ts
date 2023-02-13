import { Weather } from '@/types/api-reponse';
import { isWeatherData } from '@/utils/isWeatherData';
import { bundle } from '@remotion/bundler';
import { getCompositions, renderMedia } from '@remotion/renderer';
import { NextApiHandler } from 'next';
import { createReadStream, statSync } from 'node:fs';
import path from 'node:path';
import { webpackOverride } from 'webpack-override';

const renderVideo = async (weatherData: Weather) => {
	const compositionId = 'MyComposition';
	// You only have to do this once, you can reuse the bundle.
	const entryPath = 'src/remotion/index.ts';
	console.log('Creating a Webpack bundle of the video');
	const bundleLocation = await bundle(
		path.resolve(entryPath),
		() => undefined, // onprogress handler
		{
			webpackOverride: (config) => webpackOverride(config),
		}
	);
	const inputProps = { ...weatherData };
	// Extract all the compositions you have defined in your project
	// from the webpack bundle.
	const comps = await getCompositions(bundleLocation, {
		// You can pass custom input props that you can retrieve using getInputProps()
		// in the composition list. Use this if you want to dynamically set the duration or
		// dimensions of the video.
		inputProps,
	});
	// Select the composition you want to render.
	const composition = comps.find((c) => c.id === compositionId);
	// Ensure the composition exists
	if (!composition) {
		throw new Error(`No composition with the ID ${compositionId} found.
  Review "${entryPath}" for the correct ID.`);
	}

	const outputLocation = `out/${compositionId}.mp4`;
	console.log('Attempting to render:', outputLocation);
	await renderMedia({
		composition,
		serveUrl: bundleLocation,
		codec: 'h264',
		outputLocation,
		inputProps,
	});
	console.log('Render done!');
};

const APIHandler: NextApiHandler = async (req, res) => {
	const { body } = req;

	const weatherData = JSON.parse(body);

	if (!isWeatherData(weatherData)) {
		return res.status(400).json({
			ok: false,
			error:
				'Malformed data: the provided body does not matches all the needed fields.',
		});
	}

	await renderVideo(weatherData);

	const renderedVideoPath = path.join(process.cwd(), 'out/MyComposition.mp4');
	const stat = statSync(renderedVideoPath);
	res.writeHead(200, {
		'Content-Type': 'video/mp4',
		'Content-Length': (await stat).size,
	});

	const readStream = createReadStream(renderedVideoPath);

	readStream.pipe(res);
	return res.status(200);
};

export default APIHandler;

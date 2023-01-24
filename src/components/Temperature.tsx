// import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { TEMPERATURE_UNIT } from '../constants';
import { WeatherMain } from '../types/api-reponse';
import { CompositionLayout } from './shared/CompositionLayout';

type Props = WeatherMain;

export function Temperature({
	feels_like,
	humidity,
	pressure,
	temp,
	temp_max,
	temp_min,
}: Props) {
	// const frame = useCurrentFrame();
	// const { fps } = useVideoConfig();

	// const scale = spring({
	// 	fps,
	// 	frame,
	// });
	//  style={{
	// 				// 	transform: `scale(${scale})`,
	// 				// }}

	return (
		<CompositionLayout>
			<span>It feels like: {`${feels_like} ${TEMPERATURE_UNIT}`}</span>
			<span>Humidity level is {humidity}</span>
			<span>The pressure is {pressure}</span>

			<h4>Temperature</h4>
			<span>The temperature is {temp}</span>
			<span>
				The maxium is {temp_max} and the minimum is {temp_min}
			</span>
		</CompositionLayout>
	);
}

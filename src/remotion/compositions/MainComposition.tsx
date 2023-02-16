import {
	Audio,
	interpolate,
	Series,
	staticFile,
	useVideoConfig,
} from 'remotion';
import { Clouds } from '../components/Clouds';
import { Mixed } from '../components/Mixed';
import { Temperature } from '../components/Temperature';
import { WeatherDescription } from '../components/WeatherDescription';
import { Title } from '../components/Welcome';
import { Wind } from '../components/Wind';
import { Weather } from '../../types/api-reponse';

type Props = Weather;

export function MainComposition({
	name,
	main,
	wind,
	weather,
	clouds,
	sys,
}: Props) {
	const { width, fps } = useVideoConfig();

	return (
		<div className="w-full">
			<Audio
				src={staticFile('audio/background-loop-melodic-techno.mp3')}
				volume={(f) =>
					interpolate(f, [0, fps], [0, 1], { extrapolateLeft: 'clamp' })
				}
			/>
			<style>
				{`
           :root {
            font-size: ${0.025 * width}px;
            color: #fff;
          }
        `}
			</style>

			<Series>
				<Series.Sequence durationInFrames={120}>
					<Title countryCode={sys.country} city={name} />
				</Series.Sequence>

				<Series.Sequence durationInFrames={120}>
					<WeatherDescription {...weather[0]} />
				</Series.Sequence>

				<Series.Sequence durationInFrames={120}>
					<Temperature {...main} />
				</Series.Sequence>

				<Series.Sequence durationInFrames={120}>
					<Wind {...wind} />
				</Series.Sequence>

				<Series.Sequence durationInFrames={120}>
					<Clouds {...clouds} />
				</Series.Sequence>

				<Series.Sequence durationInFrames={120}>
					<Mixed {...main} />
				</Series.Sequence>
			</Series>
		</div>
	);
}

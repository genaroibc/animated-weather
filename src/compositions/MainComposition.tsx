import { Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Clouds } from '../components/Clouds';
import { Mixed } from '../components/Mixed';
import { Temperature } from '../components/Temperature';
import { WeatherDescription } from '../components/WeatherDescription';
import { Title } from '../components/Welcome';
import { Wind } from '../components/Wind';
import { Weather } from '../types/api-reponse';

type Props = Weather;

export function MainComposition({ name, main, wind, weather, clouds }: Props) {
	const { fps, width } = useVideoConfig();
	const frame = useCurrentFrame();
	const scale = spring({ fps, frame });

	return (
		<div className="w-full">
			<style>
				{`
           :root {
            font-size: ${0.025 * width}px;
            color: #fff;
          }
        `}
			</style>

			<Sequence style={{ transform: `scale(${scale})` }}>
				<Title city={name} />
			</Sequence>

			<Sequence from={120}>
				<WeatherDescription {...weather[0]} />
			</Sequence>

			<Sequence from={240}>
				<Temperature {...main} />
			</Sequence>

			<Sequence from={360}>
				<Wind {...wind} />
			</Sequence>

			<Sequence from={480}>
				<Clouds {...clouds} />
			</Sequence>

			<Sequence from={600}>
				<Mixed {...main} />
			</Sequence>
		</div>
	);
}

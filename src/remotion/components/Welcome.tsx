import { isEmptyValue } from '../../utils/isEmptyValue';
import { Img, interpolate } from 'remotion';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Weather } from '../../types/api-reponse';
import { CompositionLayout } from './shared/CompositionLayout';
import { TRANSITION_DURATION } from '../constants';

type Props = {
	city: Weather['name'];
	countryCode: string;
};

export function Title({ city, countryCode }: Props) {
	const frame = useCurrentFrame();
	const { fps, width } = useVideoConfig();
	const scale = spring({ fps, frame });
	const scale2 = spring({
		fps,
		frame,
		from: 0.0001,
		to: 1,
		config: {
			stiffness: 100,
			damping: 6,
			mass: 1,
		},
		durationInFrames: 50,
	});

	const driver = spring({
		frame,
		fps,
	});

	const spr = spring({
		fps,
		frame,
		config: { damping: 400 },
		durationInFrames: TRANSITION_DURATION,
	});

	return (
		<CompositionLayout from="top" to="bottom">
			<span
				style={{
					transform: `scale(${scale2})`,
				}}
				className="text-6xl"
			>
				🌤️
			</span>
			<p
				style={{ marginTop: interpolate(driver, [0, 1], [200, 0]) }}
				className="text-2xl m-0"
			>
				This is the climate in
			</p>
			<h1
				className="flex justify-center gap-8 text-white text-6xl text-center w-full m-0 mx-auto"
				style={{
					transform: `scale(${scale})`,
				}}
			>
				{city}
				{!isEmptyValue(countryCode) && (
					<Img
						alt=""
						className="self-center scale-150 -z-10"
						style={{
							transform: `translateX(${interpolate(
								spr,
								[0, 1],
								[-width * 1.5, 0]
							)}px) scale(1.8)`,
						}}
						src={`${
							process.env.NEXT_PUBLIC_FLAGS_URL
						}/${countryCode?.toLowerCase()}.png`}
					/>
				)}
			</h1>
		</CompositionLayout>
	);
}

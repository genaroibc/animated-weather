import { useCurrentFrame } from 'remotion';
import { DURATION } from '../../constants';

type Props = {
	children: React.ReactNode;
};

export function CompositionLayout({ children }: Props) {
	const frame = useCurrentFrame();

	// Const scale = spring({ fps, frame });

	const PROGRESS = frame / DURATION;

	const CSS_OP = PROGRESS * 9;

	return (
		<div
			className="flex flex-col justify-center items-center w-full text-2xl gap-12 m-auto font-bold transition-transform duration-1000 ease-out"
			style={{
				opacity: CSS_OP,
				transform:
					CSS_OP > 1.6
						? `translateX(-${200}%)`
						: CSS_OP > 1.5
						? `translateX(${10}%)`
						: '',
			}}
		>
			{children}
		</div>
	);
}

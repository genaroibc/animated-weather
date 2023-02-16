import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

type Props = {
	children: React.ReactNode;
};

export function Bubble({ children }: Props) {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();
	const scale = spring({ fps, frame });

	return <div style={{ transform: `scale(${scale})` }}>{children}</div>;
}

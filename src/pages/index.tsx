import { Hero } from '@/components/Hero';
import { VideoSection } from '@/components/VideoSection';

export default function Home() {
	return (
		<main className="p-4 mx-auto flex justify-center flex-col gap-12 text-center">
			<Hero />
			<VideoSection />
		</main>
	);
}

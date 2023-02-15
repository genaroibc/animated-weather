import { Hero } from '@/components/Hero';
import { VideoSection } from '@/components/VideoSection';

export default function Home() {
	return (
		<main className="p-4 mx-auto my-4 flex justify-center flex-col gap-4 text-center">
			<Hero />
			<VideoSection />
		</main>
	);
}

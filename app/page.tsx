'use client';
import 'keen-slider/keen-slider.min.css';
import { AspectRatio } from '@/components/ui/shadcn/aspect-ratio';
import Image from 'next/image';
// import { dataset_samples } from '@/constants/datasets';
import { useKeenSlider } from 'keen-slider/react';
import Link from 'next/link';
import { useCollections } from '@/hooks/collections/use-collections';
import dynamic from 'next/dynamic';
import { DatasetSkeleton } from '@/components/ui/shadcn/dataset';

const DatasetItemComp = dynamic(() => import('@/components/ui/shadcn/dataset'), {
	ssr: false,
	loading: () => <DatasetSkeleton />,
});

export default function Home() {
	const { collections } = useCollections();

	const [keenSliderBannerRef] = useKeenSlider(
		{
			slides: {
				perView: 1,
			},
			loop: true,
		},
		[
			(slider) => {
				let timeout: NodeJS.Timeout;

				const nextTimeout = () => {
					clearTimeout(timeout);

					timeout = setTimeout(() => {
						slider.next();
					}, 2_000);
				};

				slider.on('created', () => {
					nextTimeout();
				});
				slider.on('updated', nextTimeout);
			},
		],
	);

	return (
		<div className="w-full flex p-4 flex-col lg:flex-row gap-4">
			<div className="flex w-full flex-col gap-6">
				<div className="keen-slider" ref={keenSliderBannerRef}>
					<div className="keen-slider__slide flex h-full w-full">
						<AspectRatio ratio={16 / 6}>
							<Image
								src={'/banner.png'}
								alt="Gambar"
								fill
								className="rounded-md object-cover"
								priority
							/>
						</AspectRatio>
					</div>
					<div className="keen-slider__slide flex h-full w-full">
						<AspectRatio ratio={16 / 6}>
							<Image
								src={'/banner.png'}
								alt="Gambar"
								fill
								className="rounded-md object-cover"
								priority
							/>
						</AspectRatio>
					</div>
				</div>

				{/* Dataset Cards Slider */}
				<div className="w-full max-w-screen overflow-hidden space-y-4">
					<div className="flex justify-between items-center">
						<h3 className="font-medium leading-tight">Tranding Datasets</h3>
						<Link href={'#'} className="text-primary text-sm">
							See All
						</Link>
					</div>
					<div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-fr">
						{collections.map((item, i) => (
							<div key={i} className="w-full">
								<DatasetItemComp item={item} url={`/collection/${item.id}`} />
							</div>
						))}
					</div>
					{/* <div ref={keenSliderRef} className="keen-slider">
						{dataset_samples.slice(0, 10).map((item, i) => (
							<div
								key={i}
								className="keen-slider__slide !min-w-[280px] !max-w-[320px] h-full"
							>
								<DatasetItem item={item} />
							</div>
						))}
					</div> */}
				</div>
			</div>
		</div>
	);
}

'use client';
import 'keen-slider/keen-slider.min.css'
import { AspectRatio } from '@/components/ui/shadcn/aspect-ratio';
import Image from 'next/image';
import { dataset_samples } from '@/constants/datasets';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect } from 'react';
import { DatasetItem } from '@/components/ui/shadcn/dataset';
import { useKeenSlider } from "keen-slider/react"

export default function Home() {
	const [keenSliderRef] = useKeenSlider({
		slides: {
			perView: "auto",
			spacing: 16
		},
		mode: 'snap'
	})

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			containScroll: 'trimSnaps'
		},
		[Autoplay()],
	);

	useEffect(() => {
		emblaApi?.slideNodes();
	}, [emblaApi]);

	return (
		<div className="w-full flex p-4 flex-col lg:flex-row gap-4">
			<div className="flex w-full flex-col gap-6">
				<div className="overflow-hidden" ref={emblaRef}>
					<div className="flex">
						<div className="flex-shrink-0 flex-grow-0 basis-full">
							<AspectRatio ratio={16 / 4}>
								<Image
									src={'/banner.png'}
									alt="Gambar"
									fill
									className="rounded-md object-cover"
									priority
								/>
							</AspectRatio>
						</div>
						<div className="flex-shrink-0 flex-grow-0 basis-full">
							<AspectRatio ratio={16 / 4}>
								<Image
									src={'/banner.png'}
									alt="Gambar"
									fill
									className="rounded-md object-cover"
								/>
							</AspectRatio>
						</div>
						<div className="flex-shrink-0 flex-grow-0 basis-full">
							<AspectRatio ratio={16 / 4}>
								<Image
									src={'/banner.png'}
									alt="Gambar"
									fill
									className="rounded-md object-cover"
								/>
							</AspectRatio>
						</div>
						<div className="flex-shrink-0 flex-grow-0 basis-full">
							<AspectRatio ratio={16 / 4}>
								<Image
									src={'/banner.png'}
									alt="Gambar"
									fill
									className="rounded-md object-cover"
								/>
							</AspectRatio>
						</div>
					</div>
				</div>

				{/* Dataset Cards Slider */}
				<div className="w-full max-w-screen overflow-hidden">
					<div ref={keenSliderRef} className="keen-slider">
						{dataset_samples.slice(0, 10).map((item, i) => (
							<div
								key={i}
								className="keen-slider__slide !min-w-[280px] !max-w-[320px] h-full"
							>
								<DatasetItem item={item} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

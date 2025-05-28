'use client';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/virtual';
import { AspectRatio } from '@/components/ui/shadcn/aspect-ratio';
import Image from 'next/image';
import { dataset_samples } from '@/constants/datasets';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect } from 'react';
import { DatasetItem } from '@/components/ui/shadcn/dataset';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Mousewheel } from 'swiper/modules';

export default function Home() {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
		},
		[Autoplay()],
	);

	useEffect(() => {
		emblaApi?.slideNodes();
	}, [emblaApi]);

	return (
		<div className="flex w-full p-4 flex-col lg:flex-row gap-4">
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
					<Swiper
						modules={[A11y, Mousewheel]}
						spaceBetween={10}
						slidesPerView={'auto'}
						mousewheel
						className="w-full shrink-0 block"
					>
						{dataset_samples.slice(0, 10).map((item, i) => (
							<SwiperSlide
								key={i}
								className="flex justify-center w-full max-w-[300px]"
							>
								<DatasetItem item={item} />
							</SwiperSlide>
						))}
					</Swiper>
			</div>
		</div>
	);
}

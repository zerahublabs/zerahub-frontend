'use client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { dataset_samples } from '@/constants/datasets';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { buyer_samples } from '@/constants/buyers';
import { Receipt } from 'lucide-react';
import Link from 'next/link';
import moment from 'moment';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect } from 'react';
import { DatasetItem } from '@/components/ui/dataset';

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
		<div className="flex w-full p-4 flex-col lg:flex-row gap-4 rounded-tl-2xl border">
			<div className="flex w-full flex-col gap-6">
				<div className="overflow-hidden" ref={emblaRef}>
					<div className="flex">
						<div className="flex-shrink-0 flex-grow-0 basis-full">
							<AspectRatio ratio={16 / 9}>
								<Image
									src={'/banner.png'}
									alt="Gambar"
									fill
									className="rounded-md object-cover"
								/>
							</AspectRatio>
						</div>
						<div className="flex-shrink-0 flex-grow-0 basis-full">
							<AspectRatio ratio={16 / 9}>
								<Image
									src={'/banner.png'}
									alt="Gambar"
									fill
									className="rounded-md object-cover"
								/>
							</AspectRatio>
						</div>
						<div className="flex-shrink-0 flex-grow-0 basis-full">
							<AspectRatio ratio={16 / 9}>
								<Image
									src={'/banner.png'}
									alt="Gambar"
									fill
									className="rounded-md object-cover"
								/>
							</AspectRatio>
						</div>
						<div className="flex-shrink-0 flex-grow-0 basis-full">
							<AspectRatio ratio={16 / 9}>
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
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
					{dataset_samples.map((item, i) => (
						<DatasetItem key={i} item={item} />
					))}
				</div>
			</div>
			<div className="flex-1 sticky top-4 self-start">
				<Card className="w-[300px] px-4 py-4">
					<Table>
						<TableBody>
							{buyer_samples.slice(0, 10).map((buyer, i) => (
								<TableRow key={i}>
									<TableCell>
										<div className="p-2 text-muted-foreground border flex items-center justify-center rounded-xl">
											<Receipt size={15} />
										</div>
									</TableCell>
									<TableCell className="flex flex-col justify-center items-start">
										<Link href={'#'} className="text-primary font-semibold">
											{buyer.address.substring(0, 10)}
											{'...'}
										</Link>
										<small>{moment(buyer.timestamp).fromNow()}</small>
									</TableCell>
									<TableCell>{buyer.dataset.price}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Card>
			</div>
		</div>
	);
}

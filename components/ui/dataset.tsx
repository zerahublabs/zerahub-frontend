import { Card, CardContent, CardTitle } from './card';
import { AspectRatio } from './aspect-ratio';
import Image from 'next/image';
import { DatasetProps } from '@/constants/datasets';
import { Badge } from './badge';

export function DatasetItem(props: { item: DatasetProps }) {
    return (
        <Card className="mb-2 py-0">
            <div className="overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                    <Image
                        fill
                        src={`https://dummyimage.com/600x400/000/fff&text=${props.item.title}`}
                        className="rounded-t-xl"
                        alt="Random Dataset Cover"
                    />
                </AspectRatio>
            </div>
            <CardContent className="flex flex-col gap-4 mb-4">
                <CardTitle className="text-muted-foreground">
                    {props.item.title.substring(0, 20)}...
                </CardTitle>
                <div className="flex justify-between">
                    <small className="font-semibold text-sm text-primary">{props.item.price}</small>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Badge variant={'outline'}>1 Files</Badge>
                    <Badge variant={'outline'}>10k+</Badge>
                    <Badge variant={'outline'}>20 MB</Badge>
                    <Badge variant={'outline'}>CSV</Badge>
                </div>
            </CardContent>
        </Card>
    );
}

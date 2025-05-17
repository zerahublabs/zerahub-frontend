import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import React from 'react';

export default function Page() {
    return (
        <div className="flex w-full p-4 flex-row gap-4 rounded-tl-2xl border">
            <div className="flex flex-col w-full gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>About Datasets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa id
                        consequuntur hic possimus doloribus, nemo, error similique nulla, illum
                        ullam fuga eius tempore eum molestiae earum distinctio? Voluptatem,
                        dignissimos voluptatibus!
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Columns Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table className="border">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Column</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { name: 'Name', description: 'Name of the dataset' },
                                    { name: 'Size', description: 'Size of the dataset' },
                                    { name: 'Type', description: 'Type of the dataset' },
                                    { name: 'Price', description: 'Price of the dataset' },
                                ].map((item) => (
                                    <TableRow key={item.name}>
                                        <TableCell>
                                            <Badge variant={'outline'}>{item.name}</Badge>
                                        </TableCell>
                                        <TableCell>{item.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="sticky top-4 self-start flex flex-col gap-4">
                <Card className="w-[300px]">
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="overflow-hidden">
                                <AspectRatio ratio={16 / 9}>
                                    <Image
                                        src={
                                            'https://dummyimage.com/600x400/000/fff&text=Wikipedia+Datasets'
                                        }
                                        alt="Gambar"
                                        fill
                                        className="rounded-xl object-cover"
                                    />
                                </AspectRatio>
                            </div>
                            <div className="flex flex-col w-full gap-4">
                                <h1 className="text-2xl font-bold">Wikipedia Datasets</h1>
                                <Separator />
                                <div className="flex flex-col gap-4 divide-x">
                                    <div className="inline-flex divide-x gap-4 items-center">
                                        <h3 className="font-bold text-xl">0.001 ETH</h3>
                                        <h4 className="text-muted-foreground">$130</h4>
                                    </div>
                                    <div
                                        className={`grid gap-2 grid-cols-4 bg-neutral-200/30 p-2 rounded-2xl divide-x`}
                                    >
                                        <Badge variant={'outline'}>1 Files</Badge>
                                        <Badge variant={'outline'}>10k+</Badge>
                                        <Badge variant={'outline'}>20 MB</Badge>
                                        <Badge variant={'outline'}>CSV</Badge>
                                    </div>
                                    <Button>Buy Dataset</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-[300px]">
                    <CardHeader>
                        <CardTitle>Dataset Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <h3 className="font-semibold">Categories</h3>
                                <div className="grid gap-2 grid-cols-4">
                                    {[
                                        'Wiki',
                                        'Science',
                                        'History',
                                        'Data',
                                        'AI',
                                        'ML',
                                        'NLP',
                                        'Open',
                                    ].map((category) => (
                                        <Badge
                                            key={category}
                                            variant={'outline'}
                                            className="justify-center flex items-center w-full"
                                        >
                                            {category}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

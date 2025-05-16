"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import AvatarImage from "boring-avatars";
import { dataset_samples } from "@/constants/datasets";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Home() {
  return (
    <div className="flex w-full flex-1 p-4 flex-row gap-4 rounded-tl-2xl border">
      <div className="flex w-full flex-col gap-6">
        <div className="w-full">
          <AspectRatio ratio={16 / 3}>
            <Image
              src={"/banner.png"}
              alt="Gambar"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="grid grid-cols-4 gap-4 overflow-x-auto">
          {dataset_samples.map((item, i) => (
            <Card key={i} className="mb-2 py-0">
              <div className="overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    fill
                    src={`https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80&sig=${item}`}
                    className="rounded-t-xl transition-all duration-300 hover:scale-110"
                    alt="Random Dataset Cover"
                  />
                </AspectRatio>
              </div>
              <CardContent className="flex flex-col gap-4 mb-4">
                <CardTitle className="text-muted-foreground h-[50px]">
                  {item.title}
                </CardTitle>
                <div className="flex justify-between">
                  <div className="flex items-center font-semibold text-muted-foreground">
                    {item.price}
                  </div>
                  <Avatar>
                    <AvatarImage name={`fake-image-${item}`} />
                  </Avatar>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Card className="top-6 right-6 w-80 px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Buyer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </Card>
    </div>
  );
}

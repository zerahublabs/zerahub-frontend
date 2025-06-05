import ComingSoon from '@/components/ui/coming-soon';
import { Button } from '@/components/ui/shadcn/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/shadcn/dialog';
import { EditIcon } from 'lucide-react';
import React from 'react';

export default function EditCollectionAction() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'outline'} size={'icon'}>
					<EditIcon />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Edit Collection
					</DialogTitle>
				</DialogHeader>
				<ComingSoon className='h-40' />
			</DialogContent>
		</Dialog>
	);
}

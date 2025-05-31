import { Loader } from '@/components/ui/dot-loader';
import React from 'react';

export default function Loading() {
	return (
		<div className="flex items-center justify-center w-full h-full">
			<Loader />
		</div>
	);
}

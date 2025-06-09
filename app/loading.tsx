import { LoaderCircle } from 'lucide-react';
import React from 'react';

export default function Loading() {
	return (
		<div className="absolute w-screen h-screen z-10">
			<div className="flex flex-col w-full h-full justify-center items-center">
				<LoaderCircle className="" />
			</div>
		</div>
	);
}

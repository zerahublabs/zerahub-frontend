import React from 'react';

export default function Loading() {
	return (
		<div className="flex items-center justify-center w-full h-full p-8">
			<span className="inline-block w-10 h-10 border-4 border-t-transparent border-black rounded-full animate-spin" />
		</div>
	);
}

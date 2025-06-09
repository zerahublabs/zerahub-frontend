'use client';
import { Button } from '@/components/ui/shadcn/button';
import React, { useEffect } from 'react';

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<html>
			<body>
				<h2>Something went wrong!</h2>
				<Button onClick={() => reset()}>Try again</Button>
			</body>
		</html>
	);
}

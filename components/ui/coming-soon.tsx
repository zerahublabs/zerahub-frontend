import { cn } from '@/lib/utils';
import React from 'react';

export default function ComingSoon(props: { className?: string }) {
	return (
		<div
			className={cn('flex flex-col w-full h-32 items-center justify-center', props.className)}
		>
			<p className="text-muted-foreground">Coming Soon</p>
		</div>
	);
}

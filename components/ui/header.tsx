'use client';
import React from 'react';
import { Input } from './shadcn/input';
import { Search } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { SidebarTrigger } from './shadcn/sidebar';
import dynamic from 'next/dynamic';

const WalletComp = dynamic(() => import('@/components/block/wallet/wallet'), {
	ssr: false
});

export function Header() {
	return (
		<div className="w-full p-4 gap-2 flex items-center justify-between rounded-xl">
			<div className="flex gap-2 items-center">
				<SidebarTrigger />
				<div className="w-full lg:w-[400px] border rounded-xl flex items-center px-4 justify-center">
					<Search size={20} />
					<Input
						placeholder="Search datasets..."
						className="border-none focus-visible:ring-0 bg-transparent dark:bg-transparent"
					/>
				</div>
			</div>
			<div className="flex gap-2 lg:gap-4">
				<WalletComp />
				<ModeToggle />
			</div>
		</div>
	);
}

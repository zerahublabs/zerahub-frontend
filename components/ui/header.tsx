import React from 'react';
import { Input } from './shadcn/input';
import { Search } from 'lucide-react';
import Wallet from '../block/wallet/wallet';
import { ModeToggle } from './mode-toggle';
import { SidebarTrigger } from './shadcn/sidebar';

export function Header() {
	return (
		<div className="w-full p-4 bg-card flex items-center justify-between rounded-xl">
			<div className="flex space-x-4 items-center">
				<SidebarTrigger />
				<div className="w-[400px] border rounded-xl flex items-center px-4 justify-center">
					<Search size={20} />
					<Input
						placeholder="Search datasets..."
						className="border-none focus-visible:ring-0 bg-transparent dark:bg-transparent"
					/>
				</div>
			</div>
			<div className="flex gap-4">
				<Wallet />
				<ModeToggle />
			</div>
		</div>
	);
}

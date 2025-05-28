import React from 'react';
import { Input } from './shadcn/input';
import { Search } from 'lucide-react';
import Wallet from '../block/wallet/wallet';
import { SidebarTrigger } from './shadcn/sidebar';
import { ModeToggle } from "./mode-toggle"

export function Header() {
	return (
		<div className="w-full py-4 bg-card flex items-center justify-between">
			<div className="flex gap-4">
				<SidebarTrigger />
				<div className="w-[400px] border rounded-xl flex items-center px-4 justify-center">
					<Search size={20} />
					<Input
						placeholder="Search datasets..."
						className="border-none focus-visible:ring-0"
					/>
				</div>
			</div>
			<div className="flex gap-4">
				<ModeToggle />
				<Wallet />
			</div>
		</div>
	);
}

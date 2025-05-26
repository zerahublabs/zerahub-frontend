import React from 'react';
import { Input } from './input';
import { Search } from 'lucide-react';
import Wallet from '../block/wallet/wallet';
import { SidebarTrigger } from './sidebar';

export function Header() {
	return (
		<div className="w-full py-4 bg-card flex items-center gap-4">
			<SidebarTrigger />
			<div className="flex-1 w-1/2 border rounded-xl flex items-center px-4 justify-center">
				<Search size={20} />
				<Input
					placeholder="Search datasets..."
					className="border-none focus-visible:ring-0"
				/>
			</div>
			<Wallet />
		</div>
	);
}

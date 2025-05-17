'use client';
import React, { ReactNode, useState } from 'react';
import {
	Sidebar,
	SidebarActionNewDataset,
	SidebarBody,
	SidebarLink,
} from '@/components/ui/sidebar';
import { IconBrandTabler, IconDatabase, IconSettings } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/ui/header';

export const Logo = () => {
	return (
		<a
			href="#"
			className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
		>
			<div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
		</a>
	);
};

export const LogoIcon = () => {
	return (
		<a
			href="#"
			className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
		>
			<div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
		</a>
	);
};

export default function AppProvider(props: { children: ReactNode }) {
	const links = [
		{
			label: 'Discover',
			href: '/',
			icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-card-foreground" />,
		},
		{
			label: 'My Datasets',
			href: '#',
			icon: <IconDatabase className="h-5 w-5 shrink-0 text-card-foreground" />,
		},
		{
			label: 'Settings',
			href: '#',
			icon: <IconSettings className="h-5 w-5 shrink-0 text-card-foreground" />,
		},
	];
	const [open, setOpen] = useState(true);

	return (
		<div
			className={cn(
				'mx-auto h-screen flex w-full max-w-screen flex-1 flex-col overflow-hidden rounded-md border bg-background md:flex-row',
			)}
		>
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody className="justify-between gap-10">
					<div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
						{open ? <Logo /> : <LogoIcon />}
						<div className="mt-8 flex flex-col gap-2">
							{links.map((link, idx) => (
								<SidebarLink key={idx} link={link} />
							))}
						</div>
					</div>
					<div>
						<SidebarActionNewDataset />
					</div>
				</SidebarBody>
			</Sidebar>
			<div className="flex flex-col w-full min-h-screen">
				<Header />

				<div className="w-full h-full overflow-y-auto">{props.children}</div>
			</div>
		</div>
	);
}

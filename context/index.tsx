'use client';
import React, { ReactNode, Suspense, useMemo, useState } from 'react';
import {
	Sidebar,
	SidebarActionNewDataset,
	SidebarBody,
	SidebarLink,
} from '@/components/ui/sidebar';
import { IconBrandTabler, IconDatabase, IconSettings } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/ui/header';
import Loading from '@/components/ui/loading';
import { useAuth } from '@/hooks/use-auth';
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogAction,
	AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { LoaderCircle } from 'lucide-react';
import UpdateUsernameDialog from '@/components/block/dialogs/update-username';

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
	const links = useMemo(
		() => [
			{
				label: 'Discover',
				href: '/',
				icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-card-foreground" />,
			},
			{
				label: 'My Datasets',
				href: '/my-datasets',
				icon: <IconDatabase className="h-5 w-5 shrink-0 text-card-foreground" />,
			},
			{
				label: 'Settings',
				href: '#',
				icon: <IconSettings className="h-5 w-5 shrink-0 text-card-foreground" />,
			},
		],
		[],
	);

	const [isSidebarOpen, setSidebarOpen] = useState(true);
	const { isShownSignMessage, loading, isNeedsUsername, setIsNeedsUsername, onSignMessage } =
		useAuth();

	return (
		<div
			className={cn(
				'mx-auto min-h-screen flex w-full max-w-screen flex-1 flex-col overflow-hidden rounded-md border bg-background md:flex-row',
			)}
		>
			<Sidebar open={isSidebarOpen} setOpen={setSidebarOpen}>
				<SidebarBody className="justify-between gap-10">
					<div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
						{isSidebarOpen ? <Logo /> : <LogoIcon />}
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
				<div className="h-full overflow-y-auto flex-1 min-h-0">
					<Suspense fallback={<Loading />}>{props.children}</Suspense>
				</div>

				<AlertDialog open={isShownSignMessage}>
					<AlertDialogContent className="w-sm">
						<AlertDialogHeader>
							<AlertDialogTitle>Login with wallet</AlertDialogTitle>
							<AlertDialogDescription>
								Click below to sign a message and login.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogAction disabled={loading} onClick={onSignMessage}>
								{loading && <LoaderCircle className="animate-spin" />}
								Sign Message
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				<UpdateUsernameDialog isOpen={isNeedsUsername} setIsOpen={setIsNeedsUsername} />
			</div>
		</div>
	);
}

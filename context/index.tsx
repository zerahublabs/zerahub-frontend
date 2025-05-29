'use client';
import React, { ReactNode, Suspense, useMemo } from 'react';
import { IconBrandTabler, IconDatabase, IconSettings } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/ui/header';
import Loading from '@/components/ui/shadcn/loading';
import WelcomeSign from '@/components/block/dialogs/welcome-sign';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from '@/components/ui/shadcn/sidebar';
import Link from 'next/link';

export function AppSidebar() {
	const links = useMemo(
		() => [
			{
				title: 'Discover',
				href: '/',
				icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-card-foreground" />,
			},
			{
				title: 'My Datasets',
				href: '/my-datasets',
				icon: <IconDatabase className="h-5 w-5 shrink-0 text-card-foreground" />,
			},
			{
				title: 'Settings',
				href: '#',
				icon: <IconSettings className="h-5 w-5 shrink-0 text-card-foreground" />,
			},
		],
		[],
	);

	return (
		<Sidebar variant="floating" collapsible={'icon'}>
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{links.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.href}>
											{item.icon}
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}

export default function AppProvider(props: { children: ReactNode }) {
	return (
		<div
			className={cn(
				'mx-auto min-h-screen flex w-full max-w-screen flex-1 flex-col rounded-md border bg-background md:flex-row',
			)}
		>
			<SidebarProvider>
				<div className="flex w-full overflow-y-hidden">
					<AppSidebar />
					<main className="flex-grow h-full overflow-y-hidden space-y-2">
						<Header />
						<Suspense fallback={<Loading />}>{props.children}</Suspense>

						<WelcomeSign />
					</main>
				</div>
			</SidebarProvider>
		</div>
	);
}

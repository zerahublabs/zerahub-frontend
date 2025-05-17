'use client';
import { cn } from '@/lib/utils';
import React, { useState, createContext, useContext, ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { Button } from './button';
import { Plus } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface Links {
    label: string;
    href: string;
    icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};

export const SidebarProvider = ({
    children,
    open: openProp,
    setOpen: setOpenProp,
    animate = true,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    const [openState, setOpenState] = useState(false);

    const open = openProp !== undefined ? openProp : openState;
    const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

    return (
        <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const Sidebar = ({
    children,
    open,
    setOpen,
    animate,
}: {
    children: React.ReactNode;
    open?: boolean;
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    animate?: boolean;
}) => {
    return (
        <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
            {children}
        </SidebarProvider>
    );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
    return (
        <>
            <DesktopSidebar {...props} />
            <MobileSidebar {...(props as React.ComponentProps<'div'>)} />
        </>
    );
};

export const DesktopSidebar = ({
    className,
    children,
    ...props
}: React.ComponentProps<typeof motion.div>) => {
    const { open, setOpen, animate } = useSidebar();
    return (
        <div>
            <motion.div
                className={cn(
                    'h-full px-4 py-4 hidden md:flex md:flex-col bg-card w-[150px] shrink-0',
                    className,
                )}
                animate={{
                    width: animate ? (open ? '150px' : '60px') : '150px',
                }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                {...props}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const MobileSidebar = ({ className, children, ...props }: React.ComponentProps<'div'>) => {
    const { open, setOpen } = useSidebar();
    return (
        <>
            <div
                className={cn(
                    'h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-card w-full',
                )}
                {...props}
            >
                <div className="flex justify-end z-20 w-full">
                    <IconMenu2 className="text-card-foreground" onClick={() => setOpen(!open)} />
                </div>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '-100%', opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: 'easeInOut',
                            }}
                            className={cn(
                                'fixed h-full w-full inset-0 bg-white p-10 z-[100] flex flex-col justify-between',
                                className,
                            )}
                        >
                            <div
                                className="absolute right-10 top-10 z-50 text-card-foreground"
                                onClick={() => setOpen(!open)}
                            >
                                <IconX />
                            </div>
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export const SidebarLink = ({ link, className, ...props }: { link: Links; className?: string }) => {
    const { open, animate } = useSidebar();
    return (
        <a
            href={link.href}
            className={cn('flex items-center justify-start gap-2 group/sidebar py-2', className)}
            {...props}
        >
            {link.icon}

            <motion.span
                animate={{
                    display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-card-foreground text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
            >
                {link.label}
            </motion.span>
        </a>
    );
};

export const SidebarAction = ({
    icon,
    label,
    onClick,
}: {
    icon: ReactNode;
    label: string;
    onClick: () => void;
}) => {
    const { open, animate } = useSidebar();

    return (
        <Button variant={'outline'} className="w-full" onClick={onClick}>
            {icon}

            <motion.span
                animate={{
                    display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-card-foreground text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
            >
                {label}
            </motion.span>
        </Button>
    );
};

export const SidebarActionNewDataset = () => {
    // const { open, animate } = useSidebar();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant={'outline'} className="w-full">
                        <Plus />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>New Dataset</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

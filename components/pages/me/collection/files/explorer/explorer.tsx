import { Button } from '@/components/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '@/components/ui/shadcn/context-menu';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/shadcn/dialog';
import Dropzone from '@/components/ui/shadcn/dropzone';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/shadcn/table';
import { useUploadFiles } from '@/hooks/collections/use-upload-files';
import { FileIcon, FolderClosedIcon, FolderIcon, LoaderCircle, Upload } from 'lucide-react';
import React, { ReactNode, useRef } from 'react';

const files: {
	type: string;
	name: string;
	last_commit: string;
}[] = [];

export function UploadFileAction() {
	const formRef = useRef<HTMLFormElement>(null);
	const { isLoading, onUploadHandler, setFiles } = useUploadFiles();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={'outline'} size={'icon'}>
					<Upload />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload files</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-4 items-center max-w-full">
					<form ref={formRef} onSubmit={onUploadHandler} className="w-full">
						<Dropzone
							onDrop={(e) => setFiles(e[0])}
							only="all"
							maxFiles={1}
							maxSize={1024 * 1024 * 1024}
						/>
					</form>
					<Button
						onClick={() => formRef.current?.requestSubmit()}
						disabled={isLoading}
						className="w-full"
					>
						{isLoading ? <LoaderCircle className="animate-spin" /> : <Upload />}
						Upload
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export function FileExplorerWrapperItem(props: { children: ReactNode }) {
	return (
		<ContextMenu>
			<ContextMenuTrigger className="hover:cursor-pointer">
				{props.children}
			</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuItem>Open Data Studio</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}

export default function FileExplorer() {
	return (
		<Card>
			<CardHeader className="inline-flex justify-between items-center">
				<CardTitle>File Explorer</CardTitle>
				<UploadFileAction />
			</CardHeader>
			<CardContent>
				{files.length == 0 ? (
					<div className="inline-flex justify-center items-center w-full h-full text-muted-foreground">
						No Files
					</div>
				) : (
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>
									<FileExplorerWrapperItem>
										<div className="inline-flex space-x-2 items-center">
											<FolderClosedIcon className="w-4 h-4 mr-2" />
											<small>..</small>
										</div>
									</FileExplorerWrapperItem>
								</TableCell>
								<TableCell></TableCell>
							</TableRow>
							{files.map((file, i) => {
								if (file.type === 'file') {
									return (
										<TableRow key={i}>
											<TableCell>
												<FileExplorerWrapperItem>
													<div className="inline-flex space-x-2 items-center">
														<FileIcon className="w-4 h-4 mr-2" />
														<small>{file.name}</small>
													</div>
												</FileExplorerWrapperItem>
											</TableCell>
											<TableCell>
												<small>{file.last_commit}</small>
											</TableCell>
										</TableRow>
									);
								} else if (file.type === 'folder') {
									return (
										<TableRow key={i}>
											<TableCell>
												<FileExplorerWrapperItem>
													<div className="inline-flex space-x-2 items-center">
														<FolderIcon className="w-4 h-4 mr-2" />
														<small>{file.name}</small>
													</div>
												</FileExplorerWrapperItem>
											</TableCell>
											<TableCell>
												<small>{file.last_commit}</small>
											</TableCell>
										</TableRow>
									);
								}
							})}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	);
}

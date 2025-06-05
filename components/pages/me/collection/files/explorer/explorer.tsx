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
import { FileIcon, FolderClosedIcon, FolderIcon, Upload } from 'lucide-react';
import React, { ReactNode } from 'react';

const files = [
	{
		type: 'folder',
		name: 'trains',
		last_commit: 'feat: add train dataset preprocessing scripts',
		files: [
			{
				type: 'file',
				name: 'data.csv',
				size: '100MB',
				last_commit: 'chore: update training data with latest samples',
			},
		],
	},
	{
		type: 'folder',
		name: 'test',
		last_commit: 'test: add validation dataset and test cases',
		files: [
			{
				type: 'file',
				name: 'data.csv',
				size: '100MB',
				last_commit: 'fix: correct test data formatting issues',
			},
		],
	},
	{
		type: 'file',
		name: 'README.md',
		last_commit: 'docs: update dataset documentation and usage examples',
		size: '10KB',
	},
];

export function UploadFileAction() {
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
				<div className="flex flex-col gap-4 items-center">
					<form action="">
						<Dropzone onAcceptFile={() => console.log('accepted')} />
					</form>
					<Button className="w-full">Upload</Button>
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
			</CardContent>
		</Card>
	);
}

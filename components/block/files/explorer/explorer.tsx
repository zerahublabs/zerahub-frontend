import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/shadcn/table';
import { FileIcon, FolderIcon } from 'lucide-react';
import React from 'react';

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

export default function FileExplorer() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>File Explorer</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableBody>
						{files.map((file, i) => {
							if (file.type === 'file') {
								return (
									<TableRow key={i}>
										<TableCell className="flex justify-between">
											<div className="inline-flex space-x-2 items-center">
												<FileIcon className="w-4 h-4 mr-2" />
												<small>{file.name}</small>
											</div>
											<small>{file.last_commit}</small>
										</TableCell>
									</TableRow>
								);
							} else if (file.type === 'folder') {
								return (
									<TableRow key={i}>
										<TableCell className="flex justify-between">
											<div className="inline-flex space-x-2 items-center">
												<FolderIcon className="w-4 h-4 mr-2" />
												<small>{file.name}</small>
											</div>
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

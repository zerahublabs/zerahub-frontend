import { ImageIcon, Upload } from 'lucide-react';
import React from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

const acceptedFileType = {
	image: {
		'image/*': [
			'.jpg',
			'.jpeg',
			'.png',
			'.gif',
			'.bmp',
			'.webp',
			'.svg',
			'.ico',
			'.tiff',
			'.avif',
		],
	},
	document: {
		'document/*': ['.pdf'],
	},
};

const default_max_size = 20_971_520; // 20 Mb

export default function Dropzone(props: {
	only?: 'image' | 'document';
	maxFiles?: number;
	maxSize?: number;
	onDrop: (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => void;
}) {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		accept: acceptedFileType[props.only ?? 'image'],
		maxSize: props.maxSize || default_max_size,
		autoFocus: true,
		maxFiles: props.maxFiles,
		onDrop: props.onDrop,
		onDropRejected: (fileRejections) => {
			fileRejections.forEach((fileRejection) => {
				fileRejection.errors.forEach((error) => {
					toast.error(error.message);
				});
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<div className="flex flex-col gap-4 w-full">
			<div
				{...getRootProps()}
				className="flex flex-col realtive items-center w-full h-[200px] justify-center border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer"
			>
				<input {...getInputProps()} />
				{acceptedFiles.length === 0 ? (
					<>
						<Upload />
						<p className="text-sm text-muted-foreground mt-2">
							Drag and drop your files here, or click to select files
						</p>
					</>
				) : (
					<p className="text-sm text-muted-foreground mt-2">
						Selected {acceptedFiles.length} files
					</p>
				)}
			</div>
			{
				<div className="flex flex-col gap-2">
					{acceptedFiles.map((acceptedFile, i) => (
						<div key={i} className="inline-flex items-center border rounded-xl p-4 space-x-4">
							<ImageIcon />
							<p className="text-muted-foreground">
								{acceptedFile.name.substring(0, 30)}...
								{acceptedFile.name.substring(
									acceptedFile.name.length - 30,
									acceptedFile.name.length,
								)}
							</p>
						</div>
					))}
				</div>
			}
		</div>
	);
}

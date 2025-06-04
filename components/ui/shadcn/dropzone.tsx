import { Upload } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { AspectRatio } from './aspect-ratio';

export default function Dropzone(props: { onAcceptFile: (file: File) => void }) {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			props.onAcceptFile(acceptedFiles[0]);
		}
	}, [props]);

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.ico', '.tiff', '.avif']
		},
		maxSize: 100 * 100 * 20, // 20 MB
		autoFocus: true,
		onDrop,
	});

	return (
		<div
			{...getRootProps()}
			className="flex flex-col realtive items-center w-full lg:w-[400px] h-[225px] justify-center border-2 border-dashed rounded-lg p-6 bg-slate-100/10 hover:bg-slate-100/20 transition-colors cursor-pointer"
		>
			<input {...getInputProps()} />
			{acceptedFiles.length > 0 ? (
				<AspectRatio ratio={16 / 9} className="relative w-full h-full">
					<Image
						src={URL.createObjectURL(acceptedFiles[0])}
						alt="Uploaded file preview"
						fill
						className="w-[400px] h-[225px] rounded-lg"
						loading="lazy"
					/>
				</AspectRatio>
			) : (
				<>
					<Upload />
					<p className="text-sm text-muted-foreground mt-2">
						Drag and drop your files here, or click to select files
					</p>
				</>
			)}
		</div>
	);
}

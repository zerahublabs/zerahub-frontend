'use client';
import {
	KitchenSinkToolbar,
	MDXEditor,
	MDXEditorMethods,
	headingsPlugin,
	toolbarPlugin,
	listsPlugin,
	quotePlugin,
	linkPlugin,
	linkDialogPlugin,
	imagePlugin,
	tablePlugin,
	thematicBreakPlugin,
	frontmatterPlugin,
	codeBlockPlugin,
	codeMirrorPlugin,
	diffSourcePlugin,
	markdownShortcutPlugin,
} from '@mdxeditor/editor';
import { FC } from 'react';

interface EditorProps {
	markdown: string;
	editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
	return (
		<MDXEditor
			className="border rounded-xl h-full"
			placeholder="Start typing your markdown here..."
			onChange={(e) => console.log(e)}
			ref={editorRef}
			markdown={markdown}
			plugins={[
				listsPlugin(),
				quotePlugin(),
				headingsPlugin(),
				linkPlugin(),
				linkDialogPlugin(),
				imagePlugin(),
				tablePlugin(),
				thematicBreakPlugin(),
				frontmatterPlugin(),
				codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
				codeMirrorPlugin({
					codeBlockLanguages: {
						js: 'JavaScript',
						css: 'CSS',
						txt: 'text',
						tsx: 'TypeScript',
					},
				}),
				diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
				markdownShortcutPlugin(),
				toolbarPlugin({
					toolbarClassName: 'my-classname',
					toolbarContents: () => (
						<>
							<KitchenSinkToolbar />
						</>
					),
				}),
			]}
		/>
	);
};

export default Editor;

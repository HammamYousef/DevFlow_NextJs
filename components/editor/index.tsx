'use client'

import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  toolbarPlugin,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  InsertCodeBlock,
  linkPlugin,
  linkDialogPlugin,
  tablePlugin,
  imagePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import './dark-editor.css'
import { basicDark } from 'cm6-theme-basic-dark';
import { useTheme } from 'next-themes';

interface EditorProps {
    editorRef: ForwardedRef<MDXEditorMethods> | null
    fieldChange?: (value: string) => void
    value: string
}

const Editor = ({
    editorRef,
    fieldChange,
    value,
    ...props
}: EditorProps) => {

    const { resolvedTheme } = useTheme();
    const theme = resolvedTheme === 'dark' ? [basicDark] : [];

    return (
        <MDXEditor
            ref={editorRef}
            markdown={value}
            onChange={fieldChange}
            className="background-light800_dark200 light-border-2 markdown-editor dark-editor w-full border grid"
            key={resolvedTheme}
            plugins={[
            headingsPlugin(),
            listsPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            tablePlugin(),
            imagePlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
            codeMirrorPlugin({
            codeBlockLanguages: {
                css: "css",
                txt: "txt",
                sql: "sql",
                html: "html",
                saas: "saas",
                scss: "scss",
                bash: "bash",
                json: "json",
                js: "javascript",
                ts: "typescript",
                "": "unspecified",
                tsx: "TypeScript (React)",
                jsx: "JavaScript (React)",
            },
            autoLoadLanguageSupport: true,
            codeMirrorExtensions: theme,
            }),
            diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "" }),
            toolbarPlugin({
            toolbarContents: () => (
                <ConditionalContents
                options={[
                    {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                    fallback: () => (
                        <>
                        <UndoRedo />
                        <Separator />

                        <BoldItalicUnderlineToggles />
                        <Separator />

                        <ListsToggle />
                        <Separator />

                        <CreateLink />
                        <InsertImage />
                        <Separator />

                        <InsertTable />
                        <InsertThematicBreak />

                        <InsertCodeBlock />
                        </>
                    ),
                    },
                ]}
                />
            ),
            }),
        ]}
            {...props}
            
        />
    )
}

export default Editor
import { lazy, Suspense, useState } from 'react'

const MarkdownPreview = lazy(() => import('./MarkdownPreview'))

const MarkdownEditor = () => {
    const [preview, setPreview] = useState(false);
    const [markdown, setMarkdown] = useState("");

    return (
        <div className='w-1/2 min-h-96 px-8 py-4 rounded-2xl max-h-[90vh] overflow-auto bg-gray-600 border-gray-400 border shadow-lg shadow-gray-200/10'>
            {/* Heading */}
            <div className='w-full flex justify-center'>
                <h1 className='text-3xl font-medium mb-3'>
                    Show Markdown
                </h1>
            </div>

            <div>
                {/* TextArea to add markdown */}
                <div>
                    <label htmlFor='enter-markdown' className='font-medium'>
                        Enter your Markdown
                    </label>
                    <textarea
                        id='enter-markdown'
                        value={markdown}
                        className='w-full mt-2 h-28 bg-gray-400 border-none outline-none px-2 py-1 rounded-md resize-none'
                        onChange={(e) => setMarkdown(e.target.value)}
                    />
                </div>

                {/* Check box to show markdown */}
                <div>
                    <input id='show-preview' type='checkbox' onChange={(e) => setPreview(e.target.checked)} />
                    <label htmlFor='show-preview' className='ml-2 font-medium'>
                        Show Preview
                    </label>
                </div>

                {
                    preview && (
                        <Suspense fallback="Loading...">
                            <div className='w-full max-h-72 bg-violet-950 rounded-2xl px-4 py-2 h-[1200px] mt-4 border border-gray-300/50'>
                                <MarkdownPreview markdown={markdown} />
                            </div>
                        </Suspense>
                    )
                }

            </div>

        </div>
    )
}

export default MarkdownEditor 

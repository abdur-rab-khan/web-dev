import { Remarkable } from 'remarkable';

const md = new Remarkable();

const MarkdownPreview = ({ markdown }: { markdown: string }) => {
    return (
        <div className='h-full w-full' dangerouslySetInnerHTML={{ __html: md.render(markdown) }} />
    )
}

export default MarkdownPreview
